import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// Компонент відображення інформації про книгу у вигляді картки
// Джерело зображення книги, назва, автор і ціна отримуються з об'єкта book
// Кнопка (button) передається як дочірній компонент

function BookCard({ book, button }) {
  return (
    <Card className="book-card shadow">
      <Link to={`/book/${book.id}`}>
        <Card.Img
          variant="top"
          src={book.image}
          style={{ cursor: "pointer" }}
        />
      </Link>
      <Card.Body>
        <Card.Title className="fs-4">{book.title}</Card.Title>
        <Card.Text className="text-muted fw-semibold mb-1">
          {book.author}
        </Card.Text>
        <Card.Title className="fs-3 fw-bold mt-auto w-100 text-center">
          {book.price} грн
        </Card.Title>
        {button}
      </Card.Body>
    </Card>
  );
}

export default BookCard;
