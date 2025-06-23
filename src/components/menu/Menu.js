import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import GenreDropdown from "./GenreDropdown";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import { useContext } from "react";
import { UserContext } from "../../logic/Contexts";
import { useWindowWidth } from "../../logic/design/useWindowWidth";

// Головне меню сайту з навігацією, вибором жанрів та користувацьким меню
function Menu() {
  const { user } = useContext(UserContext); // Отримання інформації про користувача

  // Посилання меню. Якщо користувач адміністратор — додається посилання "Додати"
  const navLinks = [
    user && user.role === "admin"
      ? { name: "Додати", path: "/book-editor/-1" }
      : null,
    { name: "Про нас", path: "/about" },
    { name: "Часті питання", path: "/faq" },
    { name: "Співпраця", path: "/collaboration" },
  ].filter(Boolean); // Видаляє null зі списку

  // Ширина екрану для приховування випадаючого списку
  const width = useWindowWidth();

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="fs-5 pt-2 pb-2">
      <Container>
        {/* Логотип/назва сайту, посилання на головну */}
        <Navbar.Brand as={NavLink} to="/" className="pe-5 fs-3 fw-bold">
          КНИГАРНЯ
        </Navbar.Brand>

        {/* Кнопка для розгортання меню на малих екранах */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Основний вміст меню */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Навігаційні посилання */}
          <Nav className="d-flex align-items-center me-auto">
            {/* Випадаюче меню жанрів */}
            {width < 1024 ? (
              <Nav.Link as={NavLink} to="/catalog">
                Книги
              </Nav.Link>
            ) : (
              <GenreDropdown />
            )}

            {/* Інші посилання меню */}
            {navLinks.map((link, i) => (
              <Nav.Link as={NavLink} to={link.path} key={i}>
                {link.name}
              </Nav.Link>
            ))}
          </Nav>

          {/* Іконка кошика та меню користувача справа */}
          <Nav className="d-flex align-items-center">
            <CartIcon />
            <UserMenu />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
