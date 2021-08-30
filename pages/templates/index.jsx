import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import MainNav from "../../components/MainNav";

export default function AllTemplates() {
  const [forms, setForms] = useState();
  const [q, setQ] = useState("");
  useEffect(() => {
    axios.get("/api/templates").then((res) => setForms(res.data.forms));
  }, []);

  let qForms = [];
  if (forms) {
    qForms = forms.filter((form) => {
      return form.title.toLowerCase().includes(q.toLowerCase());
    });
  }
  return (
    <>
      <MainNav />
      <Container>
        <div className="my-5">
          <div className="d-flex justify-content-between">
            <h1 className="border-bottom border-2">
              All Templates{" "}
              <Button
                variant="success"
                size="sm"
                className="px-2"
                href="/templates/new"
              >
                +New
              </Button>
            </h1>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search template..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </Form.Group>
          </div>
          <p className="d-flex flex-row-reverse">
            <span>
              <b>{qForms ? qForms.length : 0}</b> Template/s
            </span>
          </p>
        </div>
        {qForms ? (
          qForms.map((form) => {
            return (
              <div
                id={form._id}
                key={form._id}
                className="mb-3 p-2 w-75 border-bottom border-2 d-flex justify-content-between"
                onMouseEnter={(e) => {
                  document.getElementById(form._id).classList.add("shadow");
                }}
                onMouseLeave={(e) => {
                  document.getElementById(form._id).classList.remove("shadow");
                }}
              >
                <a href={`/templates/${form._id}`} className="w-75 my-auto">
                  {form.title}
                </a>
                <Button
                  variant="danger"
                  className="py-1"
                  onClick={(e) => {
                    axios.delete(`/api/templates/${form._id}`);
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
