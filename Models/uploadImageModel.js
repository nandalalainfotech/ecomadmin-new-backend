import mongoose from "mongoose";
const imageSchema = new mongoose.Schema(
  {
    fieldname: { type: String, required: true },
    filename: { type: String, required: true },
    originalname: { type: String, required: true },
    status: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

const uploadImage = mongoose.model("uploadImage", imageSchema);

export default uploadImage;
