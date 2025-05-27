import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  lrn: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: Number,
    required: true,
    min: 1,
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
    lowercase: true,
  },
  gradeLevel: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
