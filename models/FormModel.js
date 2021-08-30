import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  fields: [
    {
      label: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      options: String,
    },
  ],
});

let Form;
if (mongoose.models) {
  Form = mongoose.models["Form"] || mongoose.model("Form", formSchema);
} else {
  Form = mongoose.model("Form", formSchema);
}

export default Form;
