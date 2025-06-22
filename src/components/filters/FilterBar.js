import "./Styles.css";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { AuthorsContext } from "../../logic/Contexts";
import { PublishersContext } from "../../logic/Contexts";
import { CoversContext } from "../../logic/Contexts";
import { BooksContext } from "../../logic/Contexts";
import ToggleList from "./ToggleList";
import GenresList from "./GenresList";
import PriceRange from "./PriceRange";
import FilterSection from "./FilterSection";
import { applyFilters } from "../../logic/filtration/applyFilters";

// Бічна панель фільтрів для книги
// Підтримується фільтрація за жанрами, авторами, видавництвами, обкладинками, ціною
const FilterBar = ({ setFitered, initialSelectedGenres = [] }) => {
  // Отримання глобальних даних через контексти
  const { books } = useContext(BooksContext);
  const { authors } = useContext(AuthorsContext);
  const { publishers } = useContext(PublishersContext);
  const { covers } = useContext(CoversContext);

  const [show, setShow] = useState(false); // Стан відображення бічної панелі
  const toggleSidebar = () => setShow(!show); // Перемикання видимості

  // Вибрані значення фільтрів
  const [selectedGenres, setSelectedGenres] = useState(initialSelectedGenres);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedCovers, setSelectedCovers] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [priceRange, setPriceRange] = useState([]);

  // Встановлення діапазону цін при отриманні книг
  useEffect(() => {
    if (books.length) {
      const prices = books.map((b) => b.price);
      setPriceRange({ from: Math.min(...prices), to: Math.max(...prices) });
    }
  }, [books]);

  // Стан розгорнутості секцій фільтрів
  const [sectionsOpen, setSectionsOpen] = useState({
    genres: true,
    authors: false,
    publishers: true,
    covers: true,
    price: true,
  });

  // Застосування фільтрів автоматично при зміні будь-якого з критеріїв
  useEffect(() => {
    const filtered = applyFilters(
      books,
      selectedAuthors,
      selectedPublishers,
      selectedCovers,
      priceRange,
      selectedGenres
    );
    setFitered(filtered);
  }, [
    selectedGenres,
    selectedAuthors,
    selectedPublishers,
    selectedCovers,
    priceRange,
    books,
  ]);

  // Альтернативне застосування фільтрів вручну (не використовується зараз)
  const handleApplyFilters = () => {
    const filtered = applyFilters(
      books,
      selectedAuthors,
      selectedPublishers,
      selectedCovers,
      priceRange,
      selectedGenres
    );
    setFitered(filtered);
  };

  return (
    <>
      {/* Кнопка відкриття бічної панелі */}
      <Button
        variant="secondary"
        onClick={toggleSidebar}
        className="pt-2 pb-2"
        id="bar-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </Button>

      {/* Бічна панель фільтрів */}
      <Offcanvas show={show} onHide={toggleSidebar} className="p-2">
        <Offcanvas.Header closeButton className="pb-1">
          <Offcanvas.Title className="fs-3 w-100 text-center">
            Фільтри
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Form>
            {/* Фільтр за жанрами */}
            <FilterSection
              header="Жанри"
              isOpen={sectionsOpen.genres}
              toggleOpen={() =>
                setSectionsOpen((prev) => ({
                  ...prev,
                  genres: !prev.genres,
                }))
              }
            >
              <GenresList list={selectedGenres} setList={setSelectedGenres} />
            </FilterSection>

            {/* Фільтр за авторами */}
            <FilterSection
              header="Автори"
              isOpen={sectionsOpen.authors}
              toggleOpen={() =>
                setSectionsOpen((prev) => ({
                  ...prev,
                  authors: !prev.authors,
                }))
              }
            >
              <ToggleList
                options={authors}
                selected={selectedAuthors}
                setSelected={setSelectedAuthors}
              />
            </FilterSection>

            {/* Фільтр за видавництвами */}
            <FilterSection
              header="Видавництва"
              isOpen={sectionsOpen.publishers}
              toggleOpen={() =>
                setSectionsOpen((prev) => ({
                  ...prev,
                  publishers: !prev.publishers,
                }))
              }
            >
              <ToggleList
                options={publishers}
                selected={selectedPublishers}
                setSelected={setSelectedPublishers}
              />
            </FilterSection>

            {/* Фільтр за типом обкладинки */}
            <FilterSection
              header="Обкладинки"
              isOpen={sectionsOpen.covers}
              toggleOpen={() =>
                setSectionsOpen((prev) => ({
                  ...prev,
                  covers: !prev.covers,
                }))
              }
            >
              <ToggleList
                options={covers}
                selected={selectedCovers}
                setSelected={setSelectedCovers}
              />
            </FilterSection>

            {/* Фільтр за ціною */}
            <FilterSection
              header="Ціна"
              isOpen={sectionsOpen.price}
              toggleOpen={() =>
                setSectionsOpen((prev) => ({
                  ...prev,
                  price: !prev.price,
                }))
              }
            >
              <PriceRange values={priceRange} setValues={setPriceRange} />
            </FilterSection>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterBar;
