import { Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { useContext, useState } from "react";
import { GenresContext } from "../../logic/Contexts";
import { useNavigate } from "react-router-dom";

// Дропдаун вибору жанру з трирівневою ієрархією (жанри > піджанри > підпіджанри)
// Навігація здійснюється при виборі жанру
// Відкриття підменю відбувається по наведенню, клік відкриває вибір жанру
const GenreDropdown = (props) => {
  const { genres } = useContext(GenresContext); // Отримання жанрів з контексту
  const [openSub, setOpenSub] = useState(null); // Індекс відкритого підменю першого рівня
  const [openSubSub, setOpenSubSub] = useState(null); // Індекс відкритого підменю другого рівня
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // Відображення основного дропдауна

  // Обробник вибору жанру
  const handleSelect = (name) => {
    if (props.onSelect) {
      props.onSelect(name);
    }

    // Визначення рядка для навігації — назва жанру або порожній рядок
    const genreName = typeof name === "string" ? name : name?.name || "";

    // Формування шляху до сторінки каталогу з жанром
    const goTo = genreName
      ? `/catalog/${encodeURIComponent(genreName)}`
      : "/catalog";

    // Якщо користувач вже на сторінці каталогу, робиться коротке перенаправлення
    if (window.location.pathname.startsWith("/catalog")) {
      navigate("/"); // Спочатку перехід на головну
      setTimeout(() => {
        navigate(goTo); // Потім на сторінку з фільтром
      }, 50);
    } else {
      navigate(goTo); // Прямий перехід
    }
  };

  // Клік по заголовку відкриває загальний каталог без фільтру
  const handleTitleClick = (e) => {
    e.preventDefault();
    handleSelect();
  };

  return (
    <Nav>
      <NavDropdown
        title={
          <span
            onClick={handleTitleClick}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            {props.title || "Книги"}
          </span>
        }
        id="genre-dropdown"
        show={showDropdown}
        onMouseEnter={() => setShowDropdown(true)} // Відкриття меню по наведенню
        onMouseLeave={() => setShowDropdown(false)} // Закриття меню при виході миші
        onToggle={() => {}} // Відключаємо управління відкриттям по кліку, щоб було лише по наведенню
      >
        {Array.isArray(genres) &&
          genres.map((genre, i) => (
            <Dropdown
              key={i}
              drop="end" // Відкриття підменю вправо
              onMouseEnter={() => setOpenSub(i)} // Відкриття підменю першого рівня
              onMouseLeave={() => setOpenSub(null)} // Закриття підменю
              show={openSub === i} // Контроль відображення підменю
            >
              <Dropdown.Toggle
                as="div" // Використовуємо div замість кнопки
                className="dropdown-item"
                onClick={() => handleSelect(genre.name)} // Вибір жанру по кліку
              >
                {genre.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {genre.subgenres.map((sub, j) =>
                  Array.isArray(sub.subgenres) && sub.subgenres.length > 0 ? (
                    <Dropdown
                      key={j}
                      drop="end" // Підменю другого рівня теж вправо
                      onMouseEnter={() => setOpenSubSub(j)} // Відкриття підменю другого рівня
                      onMouseLeave={() => setOpenSubSub(null)} // Закриття
                      show={openSubSub === j}
                    >
                      <Dropdown.Toggle
                        as="div"
                        className="dropdown-item"
                        onClick={() => handleSelect(sub.name)} // Вибір піджанру
                      >
                        {sub.name}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {sub.subgenres.map((subsub, k) => (
                          <Dropdown.Item
                            key={k}
                            onClick={() => handleSelect(subsub)} // Вибір підпіджанру
                          >
                            {subsub}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Dropdown.Item
                      key={j}
                      onClick={() => handleSelect(sub.name)} // Вибір піджанру без підпіджанрів
                    >
                      {sub.name}
                    </Dropdown.Item>
                  )
                )}
              </Dropdown.Menu>
            </Dropdown>
          ))}
      </NavDropdown>
    </Nav>
  );
};

export default GenreDropdown;
