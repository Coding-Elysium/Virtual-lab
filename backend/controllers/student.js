import Student from "../schema/StudentModel.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const createStudent = async (req, res) => {
  try {
    const {
      lrn,
      firstName,
      lastName,
      email,
      password,
      gradeLevel,
      gender,
      status,
    } = req.body;

    if (
      !lrn ||
      !firstName ||
      !lastName ||
      !email ||
      !gender ||
      !password ||
      !gradeLevel
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingStudent = await Student.findOne({
      $or: [{ lrn }, { email }],
    });
    if (existingStudent) {
      return res.status(409).json({ message: "Student already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      lrn,
      firstName,
      lastName,
      email,
      gender,
      password: hashedPassword,
      gradeLevel,
      status,
    });

    await student.save();

    const { password: _, ...studentData } = student.toObject();

    res
      .status(200)
      .json({ message: "Student added successfully", student: studentData });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getStudentsApproved = async (req, res) => {
  try {
    const students = await Student.find({ status: "Approved" });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getStudentsPending = async (req, res) => {
  try {
    const students = await Student.find({ status: "Pending" });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getOneStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, gradeLevel, gender } = req.body;

    if (!firstName || !lastName || !email || !gender || !gradeLevel) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { firstName, lastName, email, gradeLevel, gender },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student updated successfully.", student });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const acceptStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res
      .status(200)
      .json({ message: "Student accepted successfully.", student });
  } catch (error) {
    console.error("Error accepting student:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
