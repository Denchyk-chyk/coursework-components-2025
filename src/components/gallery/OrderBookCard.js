import { Button, Form } from 'react-bootstrap';
import BookCard from './BookCard';

// Компонент замовлення книги у вигляді картки
// Використовується компонент BookCard з кастомною кнопкою у вигляді блоку введення кількості та кнопки зменшення

function OrderBookCard({ book, count }) {
    return (
        <BookCard
            book={book}
            className='order-book-card'
            button={
                <div className='half-wrapper'>
                    <div className='half'>
                        <Form.Control type='number' defaultValue={count} />
                    </div>
                    <div className='half'>
                        <Button variant='secondary'>
                            <div className='fs-3' id='minus'>-</div>
                        </Button>
                    </div>
                </div>
            }
        />
    );
}

export default OrderBookCard;
