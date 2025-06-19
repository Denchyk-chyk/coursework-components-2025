import { Button, Col, Container, Row } from 'react-bootstrap';
import './Styles.css';

function Footer({ className }) {

    return (
        <footer className={`text-secondary ${className}`}>
            <Container>
            <Row xs={1} lg={2} className='mb-3'>
                <Col className='border-bottom border-secondary'>
                    <h2 className='fw-bold text-white'>КНИГАРНЯ</h2>
                </Col>
                <Col className='menu-items-container border-bottom border-secondary'>
                    {['Про нас', 'Часті питання', 'Співпраця'].map((e, i) =>    
                        <Button variant='link' key={i} className='fs-5 text-start ps-0'>{e}</Button>
                    )}
                </Col>
            </Row>
            <p>bookstore@gmail.com</p>
            <p>вул. Незалженості, 99, кв. 99, м. Івано-Франківськ, 17000</p>
            <p>0XX XXX XX XX</p>
            <p className='pt-3 mt-2 text-white border-top border-secondary ms-n3 me-n2'>© 2024 Всі права захищено</p>
            </Container>
        </footer>
    );
}

export default Footer;
