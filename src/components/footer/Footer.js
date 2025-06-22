import { Button, Col, Container, Row } from "react-bootstrap";
import "./Styles.css";
import { useNavigate } from "react-router-dom";

// Футер сайту інтернет-книгарні з інформаційними посиланнями та контактами
function Footer({ className }) {
  const navigate = useNavigate(); // Хук для навігації між сторінками

  // Масив інформаційних посилань, які відображаються у футері
  const infoLinks = [
    { name: "Про нас", path: "/about" },
    { name: "Часті питання", path: "/faq" },
    { name: "Співпраця", path: "/collaboration" },
  ];

  return (
    <footer className={`text-secondary ${className}`}>
      <Container>
        <Row xs={1} lg={2} className="mb-3">
          {/* Ліва частина футера — назва книгарні */}
          <Col className="border-bottom border-secondary">
            <h2 className="fw-bold text-white">КНИГАРНЯ</h2>
          </Col>

          {/* Права частина футера — меню з інформаційними посиланнями */}
          <Col className="menu-items-container border-bottom border-secondary">
            {infoLinks.map((e, i) => (
              <Button
                variant="link"
                key={i}
                className="fs-5 text-start ps-0"
                onClick={() => navigate(e.path)} // Перехід на відповідну сторінку
              >
                {e.name}
              </Button>
            ))}
          </Col>
        </Row>

        {/* Контактна інформація */}
        <p>bookstore@gmail.com</p>
        <p>вул. Незалженості, 99, кв. 99, м. Івано-Франківськ, 17000</p>
        <p>0XX XXX XX XX</p>

        {/* Підвал футера з авторськими правами */}
        <p className="pt-3 mt-2 text-white border-top border-secondary ms-n3 me-n2">
          © 2024 Всі права захищено
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
