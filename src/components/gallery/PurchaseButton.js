import { Button } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../../logic/Contexts";

// Кнопка додавання книги до кошика
// У разі наявності книги в кошику — виконується збільшення кількості
// У разі відсутності — виконується додавання нового запису з кількістю 1

function PurchaseButton({ book }) {
  const { cart, setCart } = useContext(CartContext);

  const handleClick = () => {
    // Пошук книги у кошику за посиланням (об'єктна ідентичність)
    const index = cart.findIndex((item) => item.book === book);

    if (index !== -1) {
      // Книга знайдена: виконується копіювання масиву та збільшення кількості
      const updatedCart = [...cart];
      updatedCart[index] = {
        ...updatedCart[index],
        count: updatedCart[index].count + 1,
      };
      setCart(updatedCart);
    } else {
      // Книга не знайдена: додається новий об'єкт з кількістю 1
      setCart([...cart, { book, count: 1 }]);
    }
  };

  return (
    <Button variant="light" onClick={handleClick}>
      Додати в кошик
    </Button>
  );
}

export default PurchaseButton;
