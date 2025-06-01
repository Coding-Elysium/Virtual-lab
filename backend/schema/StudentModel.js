import mongoose from "mongoose";
import { capitalizeWords } from "../helpers/helpers.js";

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
      lowercase: true,
    },
  },
  { collection: "students" }
);

studentSchema.pre("save", function (next) {
  if (this.firstName) this.firstName = capitalizeWords(this.firstName);
  if (this.lastName) this.lastName = capitalizeWords(this.lastName);
  if (this.email) this.email = this.email.toLowerCase();

  next();
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
