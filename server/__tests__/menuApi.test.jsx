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
        ingredients: ["ingredient 1"],
        allergens: ["allergy test 1"],
      })
      .expect(200);

    //GET
    expect(
      (await request(app).get("/api/menu").expect(200)).body.map(
        ({ title }) => title
      )
    ).toContain("Test pizza");
  });
});
