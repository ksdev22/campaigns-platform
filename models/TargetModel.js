import mongoose from "mongoose";

const targetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

let Target;
if (mongoose.models) {
  Target = mongoose.models["Target"] || mongoose.model("Target", targetSchema);
} else {
  Target = mongoose.model("Target");
}
export default Target;
