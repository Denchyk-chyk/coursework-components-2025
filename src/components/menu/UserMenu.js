import { Button, Nav } from "react-bootstrap";
import "./Styles.css";
import { useContext } from "react";
import { UserContext } from "../../logic/Contexts";
import { Link } from "react-router-dom";

// Меню користувача, яке відображає ім'я користувача та кнопку виходу,
// або кнопки входу і реєстрації, якщо користувач не авторизований
const UserMenu = () => {
  const { user, setUser } = useContext(UserContext); // Отримання даних користувача та функції для оновлення

  // Якщо користувач авторизований, відображається його ім'я та можливість вийти (клік для setUser(null))
  if (user) {
    return (
      <div>
        <Nav.Link onClick={() => setUser(null)}>{user.name}</Nav.Link>
      </div>
    );
  }

  // Якщо користувач не авторизований, показуються кнопки "Вхід" і "Реєстрація" з посиланнями на відповідні сторінки
  return (
    <div>
      <Link to="/authorization/login/">
        <Button variant="link">Вхід</Button>
      </Link>
      <Link to="/authorization/signup/">
        <Button variant="outline-danger">Реєстрація</Button>
      </Link>
    </div>
  );
};

export default UserMenu;
