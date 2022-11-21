import express from "express";
import * as path from "path";


const app = express();

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