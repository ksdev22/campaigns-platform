import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import MainNav from "../../components/MainNav";

export default function AllCampaigns() {
  const [campaigns, setCampaigns] = useState();
  const [q, setQ] = useState("");
  useEffect(() => {
    axios.get("/api/campaigns").then((res) => setCampaigns(res.data.campaigns));
  }, []);

  let qCampaigns = [];
  if (campaigns) {
    qCampaigns = campaigns.filter((campaign) => {
      return campaign.title.toLowerCase().includes(q.toLowerCase());
    });
  }

  return (
    <>
      <MainNav />
      <Container>
        <div className="my-5">
          <div className="d-flex justify-content-between">
            <h1 className="border-bottom border-2">
              All Campaigns{" "}
              <Button
                variant="success"
                size="sm"
                className="px-2"
                href="/campaigns/new"
              >
                +New
              </Button>
            </h1>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search campaign..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </Form.Group>
          </div>
          <p className="d-flex flex-row-reverse">
            <span>
              <b>{qCampaigns ? qCampaigns.length : 0}</b> Campaign/s
            </span>
          </p>
        </div>
        {qCampaigns ? (
          qCampaigns.map((campaign) => {
            return (
              <div
                id={campaign._id}
                key={campaign._id}
                className="mb-3 p-2 w-75 border-bottom border-2 d-flex justify-content-between"
                onMouseEnter={(e) => {
                  document.getElementById(campaign._id).classList.add("shadow");
                }}
                onMouseLeave={(e) => {
                  document
                    .getElementById(campaign._id)
                    .classList.remove("shadow");
                }}
              >
                <a href={`/campaigns/${campaign._id}`} className="w-75 my-auto">
                  {campaign.title}
                </a>
                <Button
                  variant="danger"
                  className="py-1"
                  onClick={(e) => {
                    axios.delete(`/api/campaigns/${campaign._id}`);
                    window.location.reload();
                  }}
                >
                  X
                </Button>
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </Container>
    </>
  );
}
