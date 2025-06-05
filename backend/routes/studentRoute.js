import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../controllers/student.js";

const router = express.Router();
router.post("/create", createStudent);
router.get("/read", getStudents);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);

export default router;
