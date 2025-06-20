import express from "express";
import { createCoc } from "../controllers/coc.js";

const router = express.Router();
router.post("/create", createCoc);

export default router;
