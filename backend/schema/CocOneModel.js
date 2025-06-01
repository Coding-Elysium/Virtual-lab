import mongoose from "mongoose";

const CocOneSchema = new mongoose.Schema(
  {
    imageFood: {
      type: String,
      required: true,
    },
    typeFood: {
      type: String,
      required: true,
    },
    recipe: {
      type: [String],
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "coc_one" }
);

CocOneSchema.pre("save", function (next) {
  if (Array.isArray(this.recipe)) {
    this.recipe = this.recipe.map((item) => item.trim());
  }
  next();
});

const CocOne = mongoose.model("CocOne", CocOneSchema);

export default CocOne;
