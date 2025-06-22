import { useState } from "react";
import { Form } from "react-bootstrap";

// Компонент списку з чекбоксами та пошуком
// Пошук фільтрує доступні опції, оновлення вибору відбувається через колбек setSelected
// Опція noSearch вимикає поле пошуку

const ToggleList = (props) => {
  const [search, setSearch] = useState(""); // Значення пошуку
  const noSearch = props.noSearch ?? false; // Відсутність пошуку за замовчуванням - false

  // Фільтрація опцій за пошуковим запитом (без урахування регістру)
  const filteredOptions =
    props.options &&
    (noSearch
      ? props.options
      : props.options.filter((option) =>
          option.toLowerCase().includes(search.toLowerCase())
        ));

  // Оновлення вибраних опцій при зміні стану чекбокса
  const handleCheck = (option, checked) => {
    let newSelected;
    if (checked) {
      newSelected = [...props.selected, option];
    } else {
      newSelected = props.selected.filter((o) => o !== option);
    }
    props.setSelected(newSelected);
  };

  return (
    props.options && (
      <div>
        {!noSearch && (
          <Form.Control
            type="text"
            placeholder="Пошук"
            className="mt-3 p-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}

        {filteredOptions.map((option, i) => (
          <Form.Check
            className="mt-2"
            key={i}
            type="checkbox"
            id={option}
            label={option}
            checked={props.selected.includes(option)}
            onChange={(e) => handleCheck(option, e.target.checked)}
          />
        ))}
      </div>
    )
  );
};

export default ToggleList;
