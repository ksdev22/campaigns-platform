import MainNav from "../components/MainNav";
import { Container, Form, Col, Row } from "react-bootstrap";
import FormModel from "../models/FormModel";
import CampaignModel from "../models/CampaignModel";
import TargetModel from "../models/TargetModel";
import { useState, useEffect } from "react";
import db from "../utils/db";

export default function Dashboard({ templatesStr, targetsStr, campaignsStr }) {
  const templates = JSON.parse(templatesStr) || [];
  const campaigns = JSON.parse(campaignsStr) || [];
  const targets = JSON.parse(targetsStr) || [];

  return (
    <>
      <MainNav />
      <Container>
        <h1 className="mb-3 border-bottom border-2">Dashboard</h1>

        <Row className="mt-5">
          <Col>
            <Container className="mb-5">
              <h3 className="border-bottom border-2 w-50">
                Recent Campaigns ({campaigns.length})
              </h3>
              <Row className="mb-3">
                <Col>
                  <b>Title</b>
                </Col>
                <Col>
                  <b>Status</b>
                </Col>
                <Col>
                  <b>No. of Targets</b>
                </Col>
                <Col>
                  <b>Date</b>
                </Col>
              </Row>
              {campaigns.map((campaign) => {
                return (
                  <Row key={campaign._id} className="mb-1">
                    <Col>
                      <a href={`/campaigns/${campaign._id}`}>
                        {campaign.title}
                      </a>
                    </Col>
                    <Col>{campaign.status}</Col>
                    <Col>{campaign.targets.length}</Col>
                    <Col>{campaign.date.split("T")[0]}</Col>
                  </Row>
                );
              })}
            </Container>
          </Col>
          <Col>
            <Container className="mb-5">
              <h3 className="border-bottom border-2 w-50">
                Recent Templates ({templates.length})
              </h3>
              <Row className="mb-3">
                <Col>
                  <b>Title</b>
                </Col>
                <Col>
                  <b>Fields</b>
                </Col>
              </Row>
              {templates.map((template) => {
                return (
                  <Row key={template._id} className="mb-1">
                    <Col>
                      <a href={`/templates/${template._id}`}>
                        {template.title}
                      </a>
                    </Col>
                    <Col>
                      {template.fields.map((field) => field.label).join(", ")}
                    </Col>
                  </Row>
                );
              })}
            </Container>

            <Container className="mb-5">
              <h3 className="border-bottom border-2 w-50">
                Recent Targets ({targets.length})
              </h3>
              <Row className="mb-3">
                <Col>
                  <b>Name</b>
                </Col>
                <Col>
                  <b>Email</b>
                </Col>
              </Row>
              {targets.map((target) => {
                return (
                  <Row key={target._id} className="mb-1">
                    <Col>{target.name}</Col>
                    <Col>{target.email}</Col>
                  </Row>
                );
              })}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  db();

  let campaigns;
  let templates;
  let targets;
  try {
    templates = await FormModel.find().sort({ _id: -1 }).limit(5).exec();
    targets = await TargetModel.find().sort({ _id: -1 }).limit(5).exec();
    campaigns = await CampaignModel.find({}).sort({ _id: -1 }).limit(5).exec();
  } catch (e) {
    campaigns = [];
    templates = [];
    targets = [];
  }
  return {
    props: {
      templatesStr: JSON.stringify(templates),
      targetsStr: JSON.stringify(targets),
      campaignsStr: JSON.stringify(campaigns),
    },
  };
}
