import express from "express";
import {
  acceptStudent,
  createStudent,
  deleteStudent,
  getOneStudent,
  getStudentsApproved,
  getStudentsPending,
  updateStudent,
} from "../controllers/student.js";

const router = express.Router();
router.post("/create", createStudent);
router.get("/read/approved", getStudentsApproved);
router.get("/read/pending", getStudentsPending);
router.get("/read/:id", getOneStudent);
router.put("/update/:id", updateStudent);
router.put("/accept/:id", acceptStudent);
router.delete("/delete/:id", deleteStudent);

export default router;
