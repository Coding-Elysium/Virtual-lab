import CocOne from "../schema/CocOneModel.js";

export const addCocOneController = async (req, res) => {
  try {
    const { imageFood, typeFood, recipe, student, category } = req.body;

    if (!imageFood || !typeFood || !recipe || !student || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newCocOne = new CocOne({
      imageFood,
      typeFood,
      recipe,
      student,
      category,
    });

    await newCocOne.save();

    res
      .status(201)
      .json({ message: "CocOne created successfully.", data: newCocOne });
  } catch (error) {
    console.error("Error creating CocOne:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};
