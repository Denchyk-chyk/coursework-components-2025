import { Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { useContext, useState } from "react";
import { GenresContext } from "../../logic/Contexts";
import { useNavigate } from "react-router-dom";

const GenreDropdown = (props) => {
  const { genres } = useContext(GenresContext);
  const [openSub, setOpenSub] = useState(null);
  const [openSubSub, setOpenSubSub] = useState(null);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (name) => {
    if (props.onSelect) {
      props.onSelect(name);
    }

    const genreName = typeof name === "string" ? name : name?.name || "";

    const goTo = genreName
      ? `/catalog/${encodeURIComponent(genreName)}`
      : "/catalog";

    if (window.location.pathname.startsWith("/catalog")) {
      navigate("/");
      setTimeout(() => {
        navigate(goTo);
      }, 50);
    } else {
      navigate(goTo);
    }
  };

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
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
        onToggle={() => {}} // відключаємо управління по кліку, щоб було лише по наведенню
      >
        {Array.isArray(genres) &&
          genres.map((genre, i) => (
            <Dropdown
              key={i}
              drop="end"
              onMouseEnter={() => setOpenSub(i)}
              onMouseLeave={() => setOpenSub(null)}
              show={openSub === i}
            >
              <Dropdown.Toggle
                as="div"
                className="dropdown-item"
                onClick={() => handleSelect(genre.name)}
              >
                {genre.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {genre.subgenres.map((sub, j) =>
                  Array.isArray(sub.subgenres) && sub.subgenres.length > 0 ? (
                    <Dropdown
                      key={j}
                      drop="end"
                      onMouseEnter={() => setOpenSubSub(j)}
                      onMouseLeave={() => setOpenSubSub(null)}
                      show={openSubSub === j}
                    >
                      <Dropdown.Toggle
                        as="div"
                        className="dropdown-item"
                        onClick={() => handleSelect(sub.name)}
                      >
                        {sub.name}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {sub.subgenres.map((subsub, k) => (
                          <Dropdown.Item
                            key={k}
                            onClick={() => handleSelect(subsub)}
                          >
                            {subsub}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Dropdown.Item
                      key={j}
                      onClick={() => handleSelect(sub.name)}
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
