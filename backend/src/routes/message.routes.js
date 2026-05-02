import express from "express";
import {
  createMessage,
  getAllMessages,
  deleteMessage,
} from "../controllers/message.controller.js";

const router = express.Router();


router.post("/contact", createMessage);


router.get("/admin/messages", getAllMessages);
router.delete("/admin/messages/:id", deleteMessage);

export default router;