import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { MenuApi } from "../menuApi.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoDbClient = new MongoClient(process.env.MONGODB_URL);

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
  it("should add a pizza", async () => {
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
