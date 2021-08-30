import db from "../../../utils/db";
import FormModel from "../../../models/FormModel";
import TargetModel from "../../../models/TargetModel";
import CampaignModel from "../../../models/CampaignModel";

export default async function handler(req, res) {
  db();

  if (req.method === "POST") {
    const newForm = new FormModel({
      ...req.body,
    });
    try {
      await newForm.save();
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(200).json({ success: false });
    }
  } else if (req.method === "GET") {
    const forms = await FormModel.find();
    res.status(200).json({ forms });
  }
}
