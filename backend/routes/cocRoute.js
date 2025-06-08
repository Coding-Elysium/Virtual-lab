import express from "express";
import { addCocOneController } from "../controllers/coc.js";

const router = express.Router();
router.post("/cocOne", addCocOneController);

export default router;
