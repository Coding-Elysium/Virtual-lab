import Student from "../schema/StudentModel.js";
import bcrypt from "bcrypt";

export const createStudent = async (req, res) => {
  try {
    const { lrn, firstName, lastName, email, password, gradeLevel } = req.body;

    if (!lrn || !firstName || !lastName || !email || !password || !gradeLevel) {
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
      password: hashedPassword,
      gradeLevel,
    });

    await student.save();

    const { password: _, ...studentData } = student.toObject();

    res
      .status(201)
      .json({ message: "Student added successfully", student: studentData });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
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
