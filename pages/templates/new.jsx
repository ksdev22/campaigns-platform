import {
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import { useState } from "react";
import CustomForm from "../../components/CustomForm";
import axios from "axios";
import MainNav from "../../components/MainNav";

export default function NewTemplate() {
  const [form, setForm] = useState({
    title: "",
    fields: [],
  });
  const [field, setField] = useState({
    label: "",
    type: "text",
    options: "",
  });

  const [error, setError] = useState("");

  return (
    <>
      <MainNav error={error} />
      <Container>
        <Row>
          <Col sm={{ span: 4 }} className="shadow my-3">
            <h3 className="text-center">Create New Template</h3>
          </Col>
          <Col
            sm={{ span: 2, offset: 6 }}
            className="d-flex align-items-center"
          >
            {" "}
            <Button variant="info" className="px-2" href="/templates">
              All Templates
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 4 }} className="shadow p-4">
            <Form className="text-center" onSubmit={(e) => e.preventDefault()}>
              <h5 className="text-center">Add Title</h5>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => {
                      return { ...prev, title: e.target.value };
                    })
                  }
                />
              </Form.Group>

              <h5 className="text-center">Add Field</h5>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter field label"
                  value={field.label}
                  onChange={(e) =>
                    setField((prev) => {
                      return { ...prev, label: e.target.value };
                    })
                  }
                />
              </Form.Group>

              <FloatingLabel label="Type">
                <Form.Select
                  className="mb-3"
                  value={field.type}
                  onChange={(e) =>
                    setField((prev) => {
                      return { ...prev, type: e.target.value };
                    })
                  }
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Picklist</option>
                </Form.Select>
              </FloatingLabel>

              {field.type === "select" && (
                <FloatingLabel
                  label="Options (comma separated)"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Enter comma separated values"
                    style={{ height: "100px" }}
                    value={field.options}
                    onChange={(e) =>
                      setField((prev) => {
                        return { ...prev, options: e.target.value };
                      })
                    }
                  />
                </FloatingLabel>
              )}
              <Button
                variant="primary"
                type="submit"
                className="py-1 px-3"
                onClick={(e) => {
                  setForm((prev) => {
                    return { ...prev, fields: [...prev.fields, field] };
                  });
                  setField({ label: "", type: "text", options: "" });
                }}
              >
                Add
              </Button>
            </Form>
          </Col>

          {/* { preview form} */}
          <Col sm={{ span: 6, offset: 1 }} className="shadow p-4">
            {!!form.title ? (
              <h5 className="text-center">{form.title}</h5>
            ) : (
              <h5 className="text-muted text-center">Add title</h5>
            )}

            <CustomForm fields={form.fields} />

            <div className="d-flex justify-content-center">
              <Button
                variant="success"
                className="py-1 px-3"
                disabled={form.fields.length > 0 && !!form.title ? false : true}
                onClick={async (e) => {
                  const res = await axios.post("/api/templates", form);
                  setForm({ title: "", fields: [] });
                  if (res.data.success) {
                    window.location.href = "/templates";
                  } else {
                    setError("Invalid Form!!!");
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }
                }}
              >
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
