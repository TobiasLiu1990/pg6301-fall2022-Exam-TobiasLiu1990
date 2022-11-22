import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as path from "path";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { MenuApi } from "./menuApi.js";
import { UserApi } from "./userApi.js";

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser(process.env.COOKIE_SECRET)); //Define the secret everyone should use.
app.use(bodyParser.json()); //Need to tell Express to parse JSON
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//MongoDB connection
const mongoDbClient = new MongoClient(process.env.MONGODB_URL);
mongoDbClient.connect().then(async () => {
  console.log("Connected to MongoDB");

  app.use(
    "/api/login",
    UserApi(mongoDbClient.db(process.env.MONGODB_DATABASE || "test_database"))
  );
});

app.use(
  "/api/menu",
  MenuApi(mongoDbClient.db(process.env.MONGODB_DATABASE || "test_database"))
);

const users = [
  {
    role: "admin",
    username: "Thor Odinson",
    password: "Thor",
    fullName: "Strongest Avenger",
  },
  {
    role: "regular",
    username: "test",
    password: "test",
    fullName: "Test Testersen",
  },
];

//Middleware check user status
app.use((req, res, next) => {
  const { username } = req.signedCookies;
  req.user = users.find((u) => u.username === username);
  next();
});

//Response to http-req
app.get("/api/login", (req, res) => {
  //Authorized user check
  function respond() {
    if (req.user) {
      const { role, username, fullName } = req.user;
      return res.json({ role, username, fullName });
    } else {
      return res.sendStatus(204);
    }
  }

  setTimeout(respond, 400);
});

app.get("/api/menu/new", (req, res) => {
  //Check role
  function checkRole() {
    if (req.user.role === "regular") {
      return res.sendStatus(403);
    }
  }
  setTimeout(checkRole, 400);
});

//Write to
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.cookie("username", user.username, { signed: true }); //Set signed cookie
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
  res.end();
});

//Logout - delete cookies
app.delete("/api/login", (req, res) => {
  res.clearCookie("username");
  res.sendStatus(200);
});

//Serve static files from dist
app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

//Listen to port
const server = app.listen(process.env.port || 3000, () => {
  console.log(
    `Server has started at http://localhost:${server.address().port}`
  );
});
