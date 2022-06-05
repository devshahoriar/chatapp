import Express from "express";
import { getAllMEssage, sendMessage } from "../controller/messageController.js";

const messageRoute = Express.Router();

messageRoute.post("/get-all-message",getAllMEssage)
messageRoute.post("/send-message", sendMessage)

export default messageRoute;