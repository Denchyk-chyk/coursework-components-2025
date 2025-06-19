import './Styles.css';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useState } from 'react';
import PurchaseBookCard from './PurchaseBookCard';

// Компонент галереї для відображення книг у сітці
// Початкова кількість елементів визначається значенням rows * 4
// При натисканні кнопки додається ще одна порція елементів

function WideGallery({ books, rows }) {
    const [count, setCount] = useState(rows * 4); // Лічильник видимих елементів

    return (
        <Container>
            <Row xs={1} sm={2} lg={3} xl={4} className='g-4'>
                {books.slice(0, count).map((book, id) => (
                    <Col key={id}>
                        <PurchaseBookCard book={book} />
                    </Col>
                ))}
            </Row>
            <div className='d-flex justify-content-center align-items-center'>
                {count < books.length &&
                    <Button variant='light' className='end-btn shadow'
                        onClick={() => setCount(count + rows * 4)}>
                        Більше
                    </Button>}
            </div>
        </Container>
    );
}

export default WideGallery;
