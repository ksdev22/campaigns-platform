import db from "../../../utils/db";
import FormModel from "../../../models/FormModel";
import CampaignModel from "../../../models/CampaignModel";
import TargetModel from "../../../models/TargetModel";

export default async function handler(req, res) {
  db();

  if (req.method === "POST") {
    try {
      const campaign = req.body;
      const form = await FormModel.findById(campaign.template);
      if (form) {
        const responses = form.fields.map((field) => {
          return { label: field.label, response: [] };
        });
        const newCampaign = new CampaignModel({
          title: campaign.title,
          template: campaign.template,
          description: campaign.description,
          responses,
          targets: campaign.targets,
          status: "New",
          date: campaign.date,
        });
        await newCampaign.save();
        res.status(200).json({ success: true });
      }
    } catch (e) {
      res.status(200).json({ success: false });
    }
  } else if (req.method === "GET") {
    const campaigns = await CampaignModel.find();
    res.status(200).json({ campaigns });
  }
}
