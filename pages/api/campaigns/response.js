import db from "../../../utils/db";
import FormModel from "../../../models/FormModel";
import CampaignModel from "../../../models/CampaignModel";
import TargetModel from "../../../models/TargetModel";

export default async function handler(req, res) {
  db();

  if (req.method === "POST") {
    const { campaignId, response } = req.body;
    try {
      const campaign = await CampaignModel.findById(campaignId);
      for (let i = 0; i < response.length; i++) {
        campaign.responses[i].response.push(response[i].response);
      }
      await campaign.save();
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  }
}
