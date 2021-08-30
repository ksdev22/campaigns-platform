import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Container, Button } from "react-bootstrap";
import CustomForm from "../../../components/CustomForm";
import MainNav from "../../../components/MainNav";

export default function CampaignView() {
  const [campaign, setCampaign] = useState();
  const [form, setForm] = useState();
  useEffect(() => {
    const id =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];
    axios.get(`/api/campaigns/${id}`).then((res) => {
      setForm(res.data.form);
      setCampaign(res.data.campaign);
    });
  }, []);
  return (
    <>
      <MainNav />
      {campaign ? (
        <Container>
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="w-50 border-bottom border-2">{campaign.title}</h1>
            <span className="p-2">
              Status : <b>{campaign.status}</b>
            </span>
            <span>
              Created On : <b>{campaign.date.split("T")[0]}</b>
            </span>
          </div>
          <div className="mb-3 mt-1">
            <h4>Description</h4>
            <p>{campaign.description}</p>
          </div>
          <Row>
            <Col sm={4} className="shadow p-4" disabled>
              {form ? (
                <>
                  <h4 className="text-center">{form.title}</h4>
                  <CustomForm fields={form.fields} />
                </>
              ) : (
                <h5>Loading...</h5>
              )}
            </Col>
            <Col sm={{ span: 6, offset: 2 }} className="shadow p-4">
              <h3 className="text-center">Action/Responses</h3>

              <div className="text-center mt-5">
                {!(campaign.status === "New") ? (
                  <div className="w-75 mx-auto d-flex flex-column justify-content-center align-items-center">
                    <b className="mx-2">Mail Already Sent</b>
                    <Button
                      className="w-50"
                      onClick={(e) => {
                        axios
                          .post("/api/mail/reminder", { id: campaign._id })
                          .then((res) => {
                            alert("Reminder Mail Sent");
                          });
                      }}
                    >
                      Send Reminder Mail
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="success"
                    onClick={(e) => {
                      axios
                        .post(`/api/campaigns/${campaign._id}`)
                        .then((res) => window.location.reload());
                    }}
                  >
                    Send Mail
                  </Button>
                )}
              </div>

              <div className="text-center mt-5">
                <Button
                  variant="info"
                  onClick={async (e) => {
                    const rows = [
                      campaign.responses.map((response) => response.label),
                    ];
                    for (
                      let i = 0;
                      i < campaign.responses[0].response.length;
                      i++
                    ) {
                      rows.push([]);
                      for (let j = 0; j < campaign.responses.length; j++) {
                        rows[rows.length - 1][j] =
                          campaign.responses[j].response[i];
                      }
                    }

                    let csvContent =
                      "data:text/csv;charset=utf-8," +
                      rows.map((e) => e.join(",")).join("\n");
                    var encodedUri = encodeURI(csvContent);
                    var link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `data.csv`);
                    document.body.appendChild(link);
                    link.click();
                  }}
                >
                  Download Responses (.csv)
                </Button>
              </div>
              <div className="mt-3 p-2">
                <h5 className="border-bottom border-2 w-50">
                  Targets ({campaign.targets.length})
                </h5>
                {campaign.targets.map((t) => {
                  return (
                    <Row
                      key={t._id}
                      id={t._id}
                      onMouseEnter={(e) =>
                        document.getElementById(t._id).classList.add("shadow")
                      }
                      onMouseLeave={(e) =>
                        document
                          .getElementById(t._id)
                          .classList.remove("shadow")
                      }
                    >
                      <Col>{t.name}</Col>
                    </Row>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
