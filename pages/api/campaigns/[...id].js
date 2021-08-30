import db from "../../../utils/db";
import FormModel from "../../../models/FormModel";
import CampaignModel from "../../../models/CampaignModel";
import TargetModel from "../../../models/TargetModel";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  db();

  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const campaign = await CampaignModel.findById(id).populate("targets");
      const form = await FormModel.findById(campaign.template);
      res.status(200).json({ campaign, form });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    await CampaignModel.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } else if (req.method === "POST") {
    const { id } = req.query;
    try {
      const campaign = await CampaignModel.findById(id).populate("targets");
      campaign.status = "In-Progress";

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "campaignsplatform@gmail.com",
          pass: "Asdfgh@12345",
        },
      });

      const emailsStr = campaign.targets.map((t) => t.email).join();
      const mailOptions = {
        from: "campaignsplatform@gmail.com",
        to: emailsStr,
        subject: campaign.title,
        text:
          campaign.description +
          "\n" +
          "Visit the following link to complete the survey\n" +
          `http://localhost:3000/campaigns/${campaign._id}/survey`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) return console.log("error");
        console.log("mail sent");
      });
      await campaign.save();
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  }
}
