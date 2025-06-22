import { Form } from "react-bootstrap";

const FormField = ({
  name,
  type,
  value,
  onChange,
  onBlur,
  rows,
  options,
  isInvalid,
  errorText,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label className="text-muted">{name}</Form.Label>

      {type === "textarea" ? (
        <Form.Control
          className="p-2"
          as="textarea"
          name={name}
          rows={rows || 3}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isInvalid={isInvalid}
        />
      ) : type === "select" ? (
        <Form.Select
          className="p-2"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isInvalid={isInvalid}
        >
          {options.map((o, i) => (
            <option key={i} value={o.value ?? o} className="p-2">
              {o.name ?? o}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          className="p-2"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isInvalid={isInvalid}
        />
      )}

      {isInvalid && errorText && (
        <Form.Control.Feedback type="invalid">
          {errorText}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormField;
