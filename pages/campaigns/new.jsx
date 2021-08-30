import {
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Container,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import db from "../../utils/db";
import FormModel from "../../models/FormModel";
import TargetModel from "../../models/TargetModel";
import CampaignModel from "../../models/CampaignModel";
import { useState, useEffect } from "react";
import MainNav from "../../components/MainNav";
import PrevTargetsSearch from "../../components/PrevTargetsSearch";

export default function NewCampaign({
  templatesStr,
  targetsStr,
  prevTargetsStr,
}) {
  const templates = JSON.parse(templatesStr);

  const [targets, setTargets] = useState(JSON.parse(targetsStr));
  const allTargets = JSON.parse(targetsStr);

  const [prevTargets, setPrevTargets] = useState(JSON.parse(prevTargetsStr));

  const [campaign, setCampaign] = useState({
    title: "",
    template: "",
    description: "",
    targets: [],
  });
  const [q, setQ] = useState("");

  const qTargets = targets.filter((t) =>
    t.name.toLowerCase().includes(q.toLowerCase())
  );

  const [error, setError] = useState("");

  return (
    <>
      <MainNav error={error} />
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="text-center my-3 border-bottom border-2 pb-2">
            Create New Campaign
          </h1>
          <Button variant="info" className="px-2" href="/campaigns">
            All Campaigns
          </Button>
        </div>
        <Row>
          <Col sm={{ span: 6 }} className="shadow p-3">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter campaign title"
                value={campaign.title}
                onChange={(e) =>
                  setCampaign((prev) => {
                    return { ...prev, title: e.target.value };
                  })
                }
              />
            </Form.Group>
            <FloatingLabel label="Select form template" className="mb-3">
              <Form.Select
                value={campaign.template}
                onChange={(e) =>
                  setCampaign((prev) => {
                    return { ...prev, template: e.target.value };
                  })
                }
              >
                <option>--Select--</option>
                {templates.map((template) => {
                  return (
                    <option key={template._id} value={template._id}>
                      {template.title}
                    </option>
                  );
                })}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Description" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Description"
                style={{ height: "100px" }}
                value={campaign.description}
                onChange={(e) =>
                  setCampaign((prev) => {
                    return { ...prev, description: e.target.value };
                  })
                }
              />
            </FloatingLabel>

            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Search Targets"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="mb-1"
                  />
                  <div
                    style={{
                      height: "150px",
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    {qTargets.map((target) => {
                      return (
                        <div
                          key={target._id}
                          className="d-inline-block my-1 mx-1"
                          onClick={(e) => {
                            setTargets((prev) => {
                              const newTargets = prev.filter(
                                (t) => t.email !== target.email
                              );
                              return [...newTargets];
                            });
                            setQ("");
                            setCampaign((prev) => {
                              return {
                                ...prev,
                                targets: [...prev.targets, target],
                              };
                            });
                          }}
                        >
                          <Badge pill bg="info" style={{ cursor: "pointer" }}>
                            <h6 className="m-0">{target.name}</h6>
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <PrevTargetsSearch
                  prevTargets={prevTargets}
                  changeHandler={(e) => {
                    setCampaign((prev) => {
                      let arr = [];
                      if (e.target.value !== "") {
                        arr = JSON.parse(e.target.value);
                      }
                      return {
                        ...prev,
                        targets: arr,
                      };
                    });
                    setTargets((prev) => {
                      let arr = [];
                      if (e.target.value !== "") {
                        arr = JSON.parse(e.target.value);
                      }
                      const newTargets = [];
                      for (let t of allTargets) {
                        let check = true;
                        for (let c of arr) {
                          if (c._id === t._id) {
                            check = false;
                          }
                        }
                        if (check) newTargets.push(t);
                      }
                      return [...newTargets];
                    });
                  }}
                />
              </Col>
            </Row>

            <div className="text-center">
              <Button
                variant="success"
                onClick={async (e) => {
                  const res = await axios.post("/api/campaigns", campaign);
                  if (res.data.success) {
                    setCampaign({ title: "", template: "", description: "" });
                    window.location.href = "/campaigns";
                  } else {
                    setError("Invalid Campaign!!!");
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }
                }}
              >
                Create
              </Button>
            </div>
          </Col>
          <Col sm={{ span: 6 }}>
            <h5 className="text-center">
              Added Targets ({campaign.targets.length})
            </h5>

            <div
              className="mt-3"
              style={{
                height: "500px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              <Row className="mb-2 ms-3">
                <Col sm={4}>
                  <b>Name</b>
                </Col>
                <Col sm={8}>
                  <b>Email</b>
                </Col>
              </Row>
              {campaign.targets.map((target) => {
                return (
                  <Row
                    id={target._id}
                    key={target.email}
                    style={{ zIndex: 1000 }}
                    onMouseEnter={(e) =>
                      document
                        .getElementById(target._id)
                        .classList.add("shadow")
                    }
                    onMouseLeave={(e) =>
                      document
                        .getElementById(target._id)
                        .classList.remove("shadow")
                    }
                    className="mb-2 ms-3"
                  >
                    <Col sm={3}>{target.name}</Col>
                    <Col sm={7}>{target.email}</Col>
                    <Col cm={1}>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={(e) => {
                          setTargets((prev) => {
                            return [...prev, target];
                          });
                          setCampaign((prev) => {
                            const newTargets = [...prev.targets].filter(
                              (t) => t._id !== target._id
                            );
                            return { ...prev, targets: newTargets };
                          });
                        }}
                      >
                        X
                      </Button>
                    </Col>
                  </Row>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  db();
  const templates = await FormModel.find();
  const targets = await TargetModel.find();
  const campaigns = await CampaignModel.find().populate("targets");
  const prevTargets = campaigns.map((campaign) => {
    return {
      id: campaign._id,
      title: campaign.title,
      targets: campaign.targets,
    };
  });
  return {
    props: {
      templatesStr: JSON.stringify(templates),
      targetsStr: JSON.stringify(targets),
      prevTargetsStr: JSON.stringify(prevTargets),
    },
  };
}
