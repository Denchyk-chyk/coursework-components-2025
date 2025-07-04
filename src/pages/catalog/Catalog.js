import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../../logic/Contexts";
import WideGallery from "../../components/gallery/WideGallery";
import FilterBar from "../../components/filters/FilterBar";
import Menu from "../../components/menu/Menu";
import Footer from "../../components/footer/Footer";
import Search from "../../components/filters/Search";
import "./Styles.css";
import { useParams } from "react-router-dom";

const Catalog = () => {
  const { books } = useContext(BooksContext);

  // Відфільтровані книги, які показуються у фільтрах
  const [filtered, setFiltered] = useState(books);

  // Книги, які відповідають пошуковому запиту
  const [found, setFound] = useState(books);

  const { genre } = useParams();

  // Оновлення відфільтрованих книг при зміні всіх книг
  useEffect(() => {
    setFiltered(books);
  }, [books]);

  return (
    <div id="catalog" className="d-flex flex-column min-vh-100">
      <Menu />

      <div id="filters">
        <FilterBar
          setFitered={setFiltered}
          initialSelectedGenres={genre ? [genre] : []}
        />
        <Search books={filtered} setFound={setFound} />
      </div>

      <section>
        <WideGallery books={found} rows={4} />
      </section>

      <Footer className="mt-auto" />
    </div>
  );
};

export default Catalog;
