import { Router } from "express";
import bodyParser from "body-parser";

/**
 * Path: /api/login
 * Access: From server.js
 *
 */

export function UserApi(mongoDatabase) {
  const userRouter = new Router();

  userRouter.get("/", async (req, res) => {
    const users = await mongoDatabase
      .collection("users")
      .find()
      .map(({ username, fullName, password }) => ({
        username,
        fullName,
        password,
      }))
      .toArray();

    return res.json(users);
  });

  //Add user to DB
  userRouter.post("/register", (req, res) => {
    const { username, fullName, password } = req.body;

    mongoDatabase.collection("users").insertOne({
      username,
      fullName,
      password,
    });
    res.sendStatus(201);
  });

  return userRouter;
}
