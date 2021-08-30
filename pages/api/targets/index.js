import db from "../../../utils/db";
import TargetModel from "../../../models/TargetModel";
import CampaingnModel from "../../../models/CampaignModel";
import FormModel from "../../../models/FormModel";

export default async function handler(req, res) {
  db();

  if (req.method === "GET") {
    const targets = await TargetModel.find();
    res.status(200).json(targets);
  } else if (req.method === "POST") {
    const reqTargets = req.body.targets;
    try {
      for (let t of reqTargets) {
        const newTarget = new TargetModel(t);
        await newTarget.save();
      }

      const targets = await TargetModel.find();
      res.status(200).json(targets);
    } catch (e) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    await TargetModel.findByIdAndDelete(id);
    const targets = await TargetModel.find();
    res.status(200).json(targets);
  }
}
