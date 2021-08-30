import db from "../../../utils/db";
import FormModel from "../../../models/FormModel";
import TargetModel from "../../../models/TargetModel";
import CampaignModel from "../../../models/CampaignModel";

export default async function handler(req, res) {
  db();

  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const form = await FormModel.findById(id);
      res.status(200).json(form);
    } catch (e) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    await FormModel.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  }
}
