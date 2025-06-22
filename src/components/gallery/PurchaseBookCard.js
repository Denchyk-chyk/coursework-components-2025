import BookCard from "./BookCard";
import AdminPurchaseButtons from "./AdminPurchaseButtons";

// Картка з книгою, що відображається в галереї для покупок
// Використовується компонент BookCard разом із компоннетом AdminPurchaseButtons
function PurchaseBookCard({ book }) {
  return <BookCard book={book} button={<AdminPurchaseButtons book={book} />} />;
}

export default PurchaseBookCard;
