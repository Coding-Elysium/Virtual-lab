import Coc from "../schema/CocModel.js";

export const createCoc = async (req, res) => {
  try {
    const {
      imageFood,
      typeOfExam,
      student,
      ingredients,
      tools,
      procedure,
      isWellCooked,
      time,
    } = req.body;

    const newCoc = new Coc({
      imageFood,
      typeOfExam,
      student,
      ingredients,
      tools,
      procedure,
      isWellCooked,
      time,
    });

    const savedCoc = await newCoc.save();

    res
      .status(200)
      .json({ message: "Student added successfully", student: studentData });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
