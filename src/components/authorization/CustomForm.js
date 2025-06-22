import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Styles.css";
import FormField from "./FormField";

// Компонент форми, приймає конфігурацію полів, обробники та заголовок
const CustomForm = ({
  header, // Заголовок форми (може містити ціну або назву)
  alternative, // Альтернативна дія (наприклад, "Увійти" замість "Зареєструватись")
  alternativeAction, // Обробник для альтернативної дії
  items, // Масив полів форми
  onSubmit, // Обробник відправлення форми
  validate, // Кастомна валідація
  onChange, // Зовнішній обробник зміни полів
  outerValues, // Зовнішні значення (для контрольованого компонента)
}) => {
  // Визначення, чи форма контрольована ззовні
  const isControlled = outerValues !== undefined;

  // Ініціалізація внутрішнього стану форми (тільки якщо неконтрольована)
  const [innerValues, setInnerValues] = useState(() =>
    Object.fromEntries(items.map((item) => [item.name, ""]))
  );

  // Використання або зовнішніх, або внутрішніх значень
  const values = isControlled ? outerValues : innerValues;

  // Стан для зберігання помилок валідації по полях
  const [errors, setErrors] = useState({});

  // Обробник зміни значень форми
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Якщо форма неконтрольована — оновити внутрішній стан
    if (!isControlled) {
      setInnerValues((prev) => ({ ...prev, [name]: value }));
    }

    // Виклик зовнішнього обробника, якщо заданий
    if (onChange) {
      onChange(e);
    }
  };

  // Обробка події надсилання форми
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Базова валідація: перевірка на порожні обов’язкові поля
    items.forEach((item) => {
      const val = String(values[item.name] ?? "");

      if (!val.trim()) {
        newErrors[item.name] = "Це поле є обов'язковим";
      }
    });

    // Додаткова кастомна валідація (асинхронна)
    if (validate) {
      const extraErrors = await validate(values);
      Object.assign(newErrors, extraErrors);
    }

    // Оновлення стану помилок
    setErrors(newErrors);

    // Якщо помилок немає — виклик обробника onSubmit
    if (Object.keys(newErrors).length === 0 && onSubmit) {
      onSubmit(values);
    }
  };

  // Рендер форми
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Form className="authorization-form thin-section" onSubmit={handleSubmit}>
        {header && <h1>{header}</h1>}
        <div className="bg-white p-3 shadow rounded">
          {items.map((item) => (
            <FormField
              key={item.name}
              {...item}
              value={values[item.name]} // Поточне значення поля
              onChange={handleChange} // Обробка зміни значення
              isInvalid={!!errors[item.name]} // Індикація помилки
              errorText={errors[item.name]} // Текст помилки
            />
          ))}
          {alternative && (
            <Button
              id="alternative-btn"
              variant="link"
              className="text-muted w-100 p-0 mb-1"
              onClick={alternativeAction}
            >
              {alternative}
            </Button>
          )}
          <Button variant="light" type="submit">
            Підтвердити
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CustomForm;
