import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  template: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  responses: [
    {
      label: {
        type: String,
        required: true,
      },
      response: [],
    },
  ],
  targets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Target",
    },
  ],
});

let Campaign;
if (mongoose.models) {
  Campaign =
    mongoose.models["Campaign"] || mongoose.model("Campaign", campaignSchema);
} else {
  Campaign = mongoose.model("Campaign", campaignSchema);
}

export default Campaign;
