import "./Styles.css";
import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ArrowButton from "../basics/ArrowButton";
import { useWindowWidth } from "../../logic/design/useWindowWidth";

// Компонент однорядкової галереї з навігацією стрілками
// Кількість елементів на сторінці визначається шириною вікна
// Для прокрутки використовується стан першого елемента

function NarrowGallery({ cardComponent, books, header }) {
  const [firstBook, setFirstBook] = useState(0); // Індекс першого відображуваного елемента

  const width = useWindowWidth();

  const pageSize = width >= 1200 ? 4 : width >= 992 ? 3 : width >= 768 ? 2 : 1;

  useEffect(() => {
    // Корекція першого індексу при зміні розміру екрана
    setFirstBook((prev) => prev - (prev % pageSize));
  }, [pageSize]);

  const visibleBooks = books.slice(firstBook, firstBook + pageSize); // Видимі елементи галереї
  const hasPrev = firstBook > 0;
  const hasNext = firstBook + pageSize < books.length;

  return (
    <Container style={{ position: "relative", paddingTop: "3.5rem" }}>
      <div className="gallery-header">
        <ArrowButton
          direction="left"
          disabled={!hasPrev}
          onClick={() => setFirstBook(firstBook - pageSize)}
        />
        <h1 className="gallery-title">{header}</h1>
        <ArrowButton
          direction="right"
          disabled={!hasNext}
          onClick={() => setFirstBook(firstBook + pageSize)}
        />
      </div>

      <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
        {visibleBooks.map((book, id) => (
          <Col key={id}>{cardComponent(book)}</Col>
        ))}
      </Row>
    </Container>
  );
}

export default NarrowGallery;
