import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
dotenv.config();
import message from "./routers/messageRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = express();
const port = process.env.PORT || 3500;

server.use(express.json());

server.use("/message", message);
server.use((err, res) => {
    console.log("Fehler ist aufgetreten", err);
    res.status(500).send("Es ist ein server Problem");
});

server.listen(port, () => {
    console.log(`Listining to port ${port}`);
});
