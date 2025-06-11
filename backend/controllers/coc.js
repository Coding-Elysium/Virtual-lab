import CocOne from "../schema/CocOneModel.js";
import Student from "../schema/StudentModel.js";

export const addCocOneController = async (req, res) => {
  try {
    const { imageFood, typeFood, student, category, stages } = req.body;

    if (!imageFood || !typeFood || !student || !category || !stages) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const studentExists = await Student.findById(student);
    if (!studentExists) {
      return res.status(404).json({ message: "Student not found." });
    }

    if (!Array.isArray(stages) || stages.length !== 3) {
      return res
        .status(400)
        .json({ message: "Exactly 3 stages are required." });
    }

    for (const stage of stages) {
      if (
        !stage.name ||
        !stage.description ||
        !stage.recipe ||
        !Array.isArray(stage.recipe)
      ) {
        return res.status(400).json({
          message:
            "Each stage must include name, description, and recipe array.",
        });
      }
    }

    const newCocOne = new CocOne({
      imageFood,
      typeFood,
      student,
      category,
      stages,
    });

    await newCocOne.save();

    res.status(201).json({
      message: "CocOne created successfully.",
      data: newCocOne,
    });
  } catch (error) {
    console.error("Error creating CocOne:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const cocOne = await CocOne.findOne({ student: studentId });

    res.status(200).json({
      student,
      exams: {
        cocOne,
      },
    });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
