import CustomForm from "../../components/CustomForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Container } from "react-bootstrap";
import MainNav from "../../components/MainNav";

export default function CustomFormView() {
  const [form, setForm] = useState(false);

  useEffect(() => {
    const id =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];
    axios.get(`/api/templates/${id}`).then((res) => {
      setForm(res.data);
    });
  }, []);

  return (
    <>
      <MainNav />
      <Container>
        {form ? (
          <>
            <Row>
              <Col sm={{ span: 4, offset: 4 }} className="shadow p-3">
                <h3 className="text-center mt-3">{form.title}</h3>
                <CustomForm fields={form.fields} />
                <div className="text-center">
                  <Button variant="primary" disabled>
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </Container>
    </>
  );
}
