import { Form } from "react-bootstrap";

// Компонент, що повертає різні поля для вводу залежно від вхідних параметрів
// Та надаєзручний доступ до них

const FormField = ({
  name, // Назва поля (одночасно label та name атрибут)
  type, // Тип вводу: text, number, select, textarea тощо
  value, // Поточне значення поля
  onChange, // Обробник зміни значення
  onBlur, // Обробник події втрати фокусу (не обов'язковий)
  rows, // Кількість рядків для textarea
  options, // Варіанти для select (масив об’єктів або рядків)
  isInvalid, // Ознака наявності помилки валідації
  errorText, // Текст помилки
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label className="text-muted">{name}</Form.Label>

      {/* Вибір типу поля залежно від параметра 'type' */}
      {type === "textarea" ? (
        <Form.Control
          className="p-2"
          as="textarea" // Використання textarea
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
          {/* Виведення опцій для select */}
          {options.map((o, i) => (
            <option key={i} value={o.value ?? o} className="p-2">
              {o.name ?? o}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          className="p-2"
          type={type} // input з вказаним типом (text, number тощо)
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isInvalid={isInvalid}
        />
      )}

      {/* Виведення повідомлення про помилку, якщо є */}
      {isInvalid && errorText && (
        <Form.Control.Feedback type="invalid">
          {errorText}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormField;
