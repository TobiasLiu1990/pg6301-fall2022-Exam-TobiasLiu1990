import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {MongoClient} from "mongodb";
import * as dotenv from "dotenv";
import {MenuApi} from "./menuApi.js";

dotenv.config();

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));

//MongoDB connection
const mongoDbClient = new MongoClient(process.env.MONGODB_URL);
mongoDbClient.connect().then(async () => {
    console.log("Connected to MongoDB");

    app.use("/api/menu", MenuApi(mongoDbClient.db(process.env.MONGODB_DATABASE || "test_database"))
    );
});





// Middleware
app.use(cookieParser(process.env.COOKIE_SECRET)); //Define the secret everyone should use.
app.use(bodyParser.json()); //Need to tell Express to parse JSON
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);



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
    console.log(`Server has started at http://localhost:${server.address().port}`);
});