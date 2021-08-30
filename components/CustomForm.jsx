import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";

export default function CustomForm({ fields }) {
  return (
    <>
      {fields.map((field) => {
        return (
          <div key={field.label}>
            {field.type === "text" && (
              <Form.Group className="mb-3">
                <Form.Label>{field.label}</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            )}

            {field.type === "number" && (
              <Form.Group className="mb-3">
                <Form.Label>{field.label}</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
            )}

            {field.type === "textarea" && (
              <Form.Group className="mb-3">
                <Form.Label>{field.label}</Form.Label>
                <Form.Control as="textarea" style={{ height: "100px" }} />
              </Form.Group>
            )}

            {field.type === "select" && (
              <FloatingLabel label={field.label}>
                <Form.Select className="mb-3">
                  {field.options.split(",").map((opt) => {
                    return <option key={opt}>{opt}</option>;
                  })}
                </Form.Select>
              </FloatingLabel>
            )}
          </div>
        );
      })}
    </>
  );
}
