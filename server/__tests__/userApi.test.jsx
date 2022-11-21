import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {UserApi} from "../userApi.js";


dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoDbClient = new MongoClient(process.env.MONGODB_URL);

beforeAll(async () => {
    await mongoDbClient.connect();
    const database = mongoDbClient.db("test_database");
    await database.collection("users").deleteMany({});
    app.use("/api/login", UserApi(database));
});

afterAll(() => {
    mongoDbClient.close();
});

describe("user api", () => {
    //POST
    it ("should add a new user and find it", async () => {
        await request(app)
            .post("/api/login/register")
            .send({
                username: "test",
                fullName: "test test",
                password: "tests",
            })
            .expect(201);

        //GET
        expect(
            (await request(app).get("/api/login").expect(200)).body.map(
                ({ username }) => username
            )
        ).toContain("test")

        expect(
            (await request(app).get("/api/login").expect(200)).body.map(
                ({ fullName }) => fullName
            )
        ).toContain("test test")

        expect(
            (await request(app).get("/api/login").expect(200)).body.map(
                ({ password }) => password
            )
        ).toContain("tests")
    });
});















































