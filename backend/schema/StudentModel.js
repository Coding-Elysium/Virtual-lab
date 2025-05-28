import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    lrn: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gradeLevel: {
      type: String,
      required: true,
      unique: false,
      lowercase: true,
    },
  },
  { collection: "students" }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
