import "./Styles.css";
import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ArrowButton from "../basics/ArrowButton";
import { useWindowWidth } from "../../logic/design/useWindowWidth";

// Компонент однорядкової галереї з навігацією стрілками
// Кількість елементів на сторінці динамічно визначається шириною вікна
// Для прокрутки використовується стан першого відображуваного елемента
function NarrowGallery({ cardComponent, books, header }) {
  const [firstBook, setFirstBook] = useState(0); // Індекс першої видимої книги

  const width = useWindowWidth(); // Отримання поточної ширини вікна

  // Визначення розміру сторінки (кількість видимих елементів) залежно від ширини екрану
  const pageSize = width >= 1200 ? 4 : width >= 992 ? 3 : width >= 768 ? 2 : 1;

  useEffect(() => {
    // При зміні розміру вікна коригується індекс першої книги,
    // щоб залишатися на початку поточної "сторінки"
    setFirstBook((prev) => prev - (prev % pageSize));
  }, [pageSize]);

  // Визначення книг, які потрібно показати на поточній сторінці
  const visibleBooks = books.slice(firstBook, firstBook + pageSize);

  // Перевірки наявності попередніх і наступних сторінок для навігації
  const hasPrev = firstBook > 0;
  const hasNext = firstBook + pageSize < books.length;

  return (
    <Container style={{ position: "relative", paddingTop: "3.5rem" }}>
      <div className="gallery-header">
        {/* Кнопка вліво, якщо є попередні елементи */}
        <ArrowButton
          direction="left"
          disabled={!hasPrev}
          onClick={() => setFirstBook(firstBook - pageSize)}
        />
        <h1 className="gallery-title">{header}</h1>
        {/* Кнопка вправо, якщо є наступні елементи */}
        <ArrowButton
          direction="right"
          disabled={!hasNext}
          onClick={() => setFirstBook(firstBook + pageSize)}
        />
      </div>

      {/* Відображення видимих книг у рядку з адаптивною кількістю колонок */}
      <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
        {visibleBooks.map((book, id) => (
          <Col key={id}>
            {/* Рендер переданого компонента для книги */}
            {cardComponent(book)}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default NarrowGallery;
