// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../utils/db";
import FormModel from "../../models/FormModel";

export default function handler(req, res) {
  db();
  res.status(200).json({ name: "John Doe" });
}
