import express from "express";
import { addCocOneController, getStudentProfile } from "../controllers/coc.js";

const router = express.Router();
router.post("/cocone", addCocOneController);
router.get("/cocone/:id", getStudentProfile);

export default router;
