import express from "express";
import * as controller from "../controllers/messageController.js";

const router = express.Router();

router
    .get("/", controller.getAllMessages)
    .get("/:id", controller.getMessage)
    .put("/:id", controller.editMessage)
    .delete("/:id", controller.deleteMessage)
    .post("/", controller.createMessage);

export default router;
