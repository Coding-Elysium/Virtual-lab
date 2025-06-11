import mongoose from "mongoose";

const StageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  recipe: {
    type: [String],
    required: true,
  },
});

const CocOneSchema = new mongoose.Schema(
  {
    imageFood: { type: String, required: true },
    typeFood: { type: String, required: true },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    category: { type: String, required: true },
    stages: {
      type: [StageSchema],
      validate: {
        validator: (v) => v.length === 3,
        message: () => "Exactly 3 stages are required.",
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "coc_one" }
);

CocOneSchema.pre("save", function (next) {
  this.stages.forEach((stage) => {
    if (Array.isArray(stage.recipe)) {
      stage.recipe = stage.recipe.map((item) => item.trim());
    }
  });
  next();
});

const CocOne = mongoose.model("CocOne", CocOneSchema);
export default CocOne;
