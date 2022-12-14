import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { MenuApi } from "../menuApi.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoDbClient = new MongoClient(
  "mongodb+srv://Mayonnaise:Temp123@cluster0.bdhu4o5.mongodb.net/?retryWrites=true&w=majority"
);

beforeAll(async () => {
  await mongoDbClient.connect();
  const database = mongoDbClient.db("test_database");
  await database.collection("menu").deleteMany({});
  app.use("/api/menu", MenuApi(database));
});

afterAll(() => {
  mongoDbClient.close();
});

describe("menu api", () => {
  //POST
  it("should add and find the pizza", async () => {
    await request(app)
      .post("/api/menu/new")
      .send({
        pizza: "Test pizza",
        price: 100,
        ingredients: "ham meat",
        allergens: "proteins oh no",
      })
      .expect(200);

    //GET
    expect(
      (await request(app).get("/api/menu").expect(200)).body.map(
        ({ pizza }) => pizza
      )
    ).toContain("Test pizza");

    expect(
      (await request(app).get("/api/menu").expect(200)).body.map(
        ({ price }) => price
      )
    ).toContain(100);

    expect(
      (await request(app).get("/api/menu").expect(200)).body.map(
        ({ ingredients }) => ingredients
      )
    ).toContain("ham meat");

    expect(
      (await request(app).get("/api/menu").expect(200)).body.map(
        ({ allergens }) => allergens
      )
    ).toContain("proteins oh no");
  });
});
