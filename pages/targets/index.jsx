import MainNav from "../../components/MainNav";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TargetIndex() {
  const [target, setTarget] = useState({
    name: "",
    email: "",
  });
  const [targets, setTargets] = useState([]);
  const [q, setQ] = useState("");

  const [csvStr, setCsvStr] = useState("");

  useEffect(() => {
    axios.get("/api/targets").then((res) => setTargets(res.data));
  }, []);

  const qTargets = targets.filter((target) => {
    return target.name.toLowerCase().includes(q.toLowerCase());
  });
  return (
    <>
      <MainNav />
      <Container>
        <Row>
          <Col sm={{ span: 3 }} className="text-center mt-5">
            <div className="shadow p-3">
              <h3 className="mb-3">Add target</h3>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={target.name}
                  onChange={(e) =>
                    setTarget((prev) => {
                      return { ...prev, name: e.target.value };
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={target.email}
                  onChange={(e) =>
                    setTarget((prev) => {
                      return { ...prev, email: e.target.value };
                    })
                  }
                />
              </Form.Group>
              <Button
                variant="success"
                className="px-4"
                onClick={(e) => {
                  axios
                    .post("/api/targets", { targets: [target] })
                    .then((res) => {
                      setTargets(res.data);
                      setTarget({ name: "", email: "" });
                    });
                }}
              >
                Add
              </Button>
            </div>

            <div className="my-3 shadow p-3">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>
                  <b>Upload targets from .csv file</b>
                </Form.Label>
                <Form.Control
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      setCsvStr(reader.result);
                    };
                    reader.readAsText(file);
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={(e) => {
                  const csvRows = csvStr.split("\r\n");
                  const targets = [];
                  for (let i = 1; i < csvRows.length; i++) {
                    const [name, email] = csvRows[i].split(",");
                    if (!!name && !!email) targets.push({ name, email });
                  }
                  axios
                    .post("/api/targets", { targets })
                    .then((res) => window.location.reload());
                }}
              >
                Upload
              </Button>
            </div>
          </Col>
          <Col sm={{ span: 8, offset: 1 }} className="shadow p-3">
            <div className="d-flex justify-content-between mx-5">
              <h3 className="border-bottom border-2">All targets</h3>
              <Form.Group className="mb-3 w-50">
                <Form.Control
                  type="text"
                  placeholder="Enter Target's Name"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="mx-5 d-flex">
              <p className="m-0 ms-auto">
                <b>{qTargets.length}</b> Result/s
              </p>
            </div>
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
                <Col sm={7}>
                  <b>Email</b>
                </Col>
              </Row>
              {qTargets.map((target) => {
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
                    <Col sm={4}>{target.name}</Col>
                    <Col sm={6}>{target.email}</Col>
                    <Col sm={1}>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={(e) => {
                          axios
                            .delete(`/api/targets?id=${target._id}`)
                            .then((res) => setTargets(res.data));
                        }}
                      >
                        <b>X</b>
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
