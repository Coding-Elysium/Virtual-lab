import express from "express";
import { cocOneController } from "../controllers/coc.js";

const router = express.Router();
router.post("/cocOne", cocOneController);

export default router;
