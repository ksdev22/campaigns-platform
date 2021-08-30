import db from "../../../../utils/db";
import CampaignModel from "../../../../models/CampaignModel";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  db();

  if (req.method === "POST") {
    const { id } = req.body;
    try {
      const campaign = await CampaignModel.findById(id).populate("targets");

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
        subject: `Reminder - ${campaign.title}`,
        text:
          "This is a reminder mail.\nVisit the following link to complete the survey\n" +
          `http://localhost:3000/campaigns/${campaign._id}/survey\nIgnore if already filled.`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) return console.log("error");
        console.log("mail sent");
      });
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  }
}
