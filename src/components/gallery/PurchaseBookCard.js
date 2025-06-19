import BookCard from "./BookCard";
import AdminPurchaseButtons from "./AdminPurchaseButtons";

function PurchaseBookCard({ book }) {
    return (
        <BookCard book={book} button={<AdminPurchaseButtons book={book}/ >} />
    );
}

export default PurchaseBookCard;
