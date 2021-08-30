import { FloatingLabel, Form } from "react-bootstrap";
export default function PrevTargetsSearch({ prevTargets, changeHandler }) {
  return (
    <>
      <Form.Group>
        <Form.Label>Select targets from previous campaigns</Form.Label>
        <Form.Select onChange={(e) => changeHandler(e)}>
          <option value="">--Select--</option>
          {prevTargets.map((t) => {
            return (
              <option key={t.id} value={JSON.stringify(t.targets)}>
                {t.title}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
    </>
  );
}
