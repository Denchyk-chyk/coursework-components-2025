import { useState, useEffect, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import BookCard from "./BookCard";
import { CartContext } from "../../logic/Contexts";

// Картка з книгою, що відображається в корзині
// Використовується компонент BookCard з кастомною кнопкою у вигляді блоку введення кількості та кнопки зменшення
function OrderBookCard({ order }) {
  const { cart, setCart } = useContext(CartContext);
  const { book, count } = order;

  // Локальний стан для input
  const [value, setValue] = useState(count);

  // Синхронізуємо локальний стан з entity.count при зміні пропса
  useEffect(() => {
    setValue(count);
  }, [count]);

  // Оновлення локального стану під час вводу
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // При blur валідую та оновлюю корзину
  const handleBlur = () => {
    let val = parseInt(value, 10);
    if (isNaN(val) || val <= 0) {
      val = 1;
    }

    setValue(val);

    // Копіюємо cart, знаходимо потрібний елемент і оновлюємо count
    const newCart = cart.map((item) => {
      if (item.book.id === book.id) {
        return { ...item, count: val };
      }
      return item;
    });

    setCart(newCart);
  };

  // Видалення книги (count = 0 або видалення з масиву)
  const handleRemove = () => {
    const newCart = cart.filter((item) => item.book.id !== book.id);
    setCart(newCart);
  };

  return (
    <BookCard
      book={book}
      className="order-book-card"
      button={
        <div className="half-wrapper">
          <div className="half">
            <Form.Control
              type="number"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              min={0}
            />
          </div>
          <div>
            <Button variant="secondary" onClick={handleRemove}>
              <div className="fs-3" id="minus">
                -
              </div>
            </Button>
          </div>
        </div>
      }
    />
  );
}

export default OrderBookCard;
