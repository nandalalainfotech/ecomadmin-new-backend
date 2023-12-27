import mongoose from "mongoose";
const imageSchema = new mongoose.Schema(
  {
    fieldname: { type: String, required: true },
    filename: { type: String, required: true },
    originalname: { type: String, required: true },
    images: [
      {
        _id: { type: String, required: true },
        fieldname: { type: String, required: true },
        filename: { type: String, required: true },
        originalname: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
