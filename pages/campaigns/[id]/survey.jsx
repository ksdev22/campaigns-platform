import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import CustomForm from "../../../components/CustomForm";

export default function Survey() {
  const [form, setForm] = useState();
  const response = [];
  useEffect(() => {
    const campaignId =
      window.location.href.split("/")[
        window.location.href.split("/").length - 2
      ];
    axios.get(`/api/campaigns/${campaignId}`).then((res) => {
      setForm(res.data.form);
    });
  }, []);

  return (
    <>
      <Container className="my-5">
        <Row className="my-5">
          <Col sm={{ span: 4, offset: 4 }} className="p-2 shadow">
            {form ? (
              <>
                <h3 className="text-center">{form.title}</h3>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    for (let i = 0; i < form.fields.length; i++) {
                      const field = form.fields[i];
                      response.push({
                        label: field.label,
                        response: e.target[i].value,
                      });
                    }
                    const campaignId =
                      window.location.href.split("/")[
                        window.location.href.split("/").length - 2
                      ];
                    axios
                      .post("/api/campaigns/response", {
                        response,
                        campaignId,
                      })
                      .then((res) => (window.location.href = "/"));
                  }}
                >
                  <CustomForm fields={form.fields} />
                  <div className="text-center">
                    <Button
                      variant="success"
                      className="px-3 py-1"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </>
            ) : (
              <h3>Loading...</h3>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
