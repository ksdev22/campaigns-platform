import mongoose from "mongoose";

const db = () => {
  if (mongoose.connections[0].readyState) return;

  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("database connected...");
    });
};

export default db;
