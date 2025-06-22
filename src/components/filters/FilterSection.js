import { Button } from "react-bootstrap";

// Компонент секції фільтрів з можливістю розгортання та згортання
// Заголовок секції та контент відображаються залежно від стану isOpen
// Кнопка перемикання відображає '-' або '+' в залежності від стану
const FilterSection = (props) => {
  return (
    <div className={`filter-section ${props.className ?? "border-top mb-1"}`}>
      <div className="d-flex justify-content-between align-items-center">
        {/* Відображення заголовка — за замовчуванням h4, або переданий кастомний headerTag */}
        {props.headerTag ?? <h4 className="mb-0">{props.header}</h4>}

        {/* Кнопка перемикання стану секції: '+' якщо закрита, '-' якщо відкрита */}
        <div className={props.isOpen ? "minus" : ""}>
          <Button
            variant="link"
            size="sm"
            onClick={props.toggleOpen}
            className="fs-5 pt-1 pb-1 text-decoration-none text-muted"
          >
            {props.isOpen ? "-" : "+"}
          </Button>
        </div>
      </div>

      {/* Відображення вмісту секції, якщо вона відкрита */}
      {props.isOpen && <div className="mb-3">{props.children}</div>}
    </div>
  );
};

export default FilterSection;
