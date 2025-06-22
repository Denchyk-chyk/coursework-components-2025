import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import FormField from "../authorization/FormField";

// Компонент діапазону цін з двома полями введення: "Від" і "До"
// Локальні стани оновлюються при зміні зовнішніх значень
// Значення проходять валідацію при втраті фокусу

const PriceRange = ({ values, setValues }) => {
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");

  // Синхронізація локальних полів з зовнішніми значеннями
  useEffect(() => {
    if (values) {
      setFromInput(values.from ?? "");
      setToInput(values.to ?? "");
    }
  }, [values]);

  // Валідація та оновлення значення "Від"
  const validateFrom = () => {
    let value = parseFloat(fromInput);
    if (isNaN(value) || value < 0) value = 0;
    if (values.to !== undefined && value > values.to) value = values.to;
    setFromInput(value);
    setValues((prev) => ({ ...prev, from: value }));
  };

  // Валідація та оновлення значення "До"
  const validateTo = () => {
    let value = parseFloat(toInput);
    if (isNaN(value) || (values.from !== undefined && value < values.from))
      value = values.from;
    setToInput(value);
    setValues((prev) => ({ ...prev, to: value }));
  };

  return (
    <div className="price-range">
      <Row>
        <Col>
          <FormField
            name="Від"
            type="number"
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
            onBlur={validateFrom}
          />
        </Col>
        <Col>
          <FormField
            name="До"
            type="number"
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
            onBlur={validateTo}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PriceRange;
