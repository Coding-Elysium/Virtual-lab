import express from "express";
import { addStudent } from "../controllers/student.js";

const router = express.Router();
router.post("/add", addStudent);

export default router;
