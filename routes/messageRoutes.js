import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { getMessages, sendMessages } from "../controllers/messageController.js";
import { validateIdParam, validateMessageInput } from "../middleware/validationMiddleware.js";

const router=Router()

router.get("/:id",  getMessages);
router.post("/send/:id",validateMessageInput,  sendMessages);

export default router