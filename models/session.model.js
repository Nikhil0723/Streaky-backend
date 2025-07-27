import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      default: null,
    },
    startTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model("Session", sessionSchema);
