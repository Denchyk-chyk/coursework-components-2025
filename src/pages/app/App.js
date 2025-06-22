import "./Styles.css";
import "../../"; // цей імпорт незрозумілий, можливо зайвий
import NarrowGallery from "../../components/gallery/NarrowGallery";
import Footer from "../../components/footer/Footer";
import CustomCarousel from "../../components/carousel/CustomCarousel";
import PurchaseBookCard from "../../components/gallery/PurchaseBookCard";
import Menu from "../../components/menu/Menu";
import { useContext, useMemo } from "react";
import { BooksContext } from "../../logic/Contexts";
import { Button } from "react-bootstrap";

function App() {
  // Дані для каруселі новин — масив об'єктів з картинками, заголовками, описами та шляхами
  const news = [
    {
      image: "/news/News 1.jpg",
      title: "Dictum risus blandit",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit leo eu aenean sed diam urna tempor.",
      path: "/first-news",
    },
    {
      image: "/news/News 2.jpg",
      title: "Tincidunt nam porta",
      desc: "Mus donec rhoncus eros lobortis nulla molestie mattis. Purus est efficitur laoreet mauris pharetra vestibulum fusce. Sodales consequat magna ante condimentum neque at luctus.",
      path: "/second-news",
    },
    {
      image: "/news/News 3.jpg",
      title: "Donec rhoncus",
      desc: "Ligula congue sollicitudin erat viverra ac tincidunt nam. Lectus commodo augue arcu dignissim velit aliquam imperdiet. ",
      path: "/third-news",
    },
  ];

  // Отримання списку книг з контексту
  const { books } = useContext(BooksContext);

  // Функція для випадкового вибору частини масиву книг
  // size - частка (0-1) від загального масиву
  const randomPart = (arr, size) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.ceil(arr.length * size));
  };

  // Створення трьох груп книг із різним розміром (30%, 20%, 50%)
  // Використовується useMemo, щоб не перераховувати без потреби
  const groups = useMemo(
    () => [
      randomPart(books, 0.3),
      randomPart(books, 0.2),
      randomPart(books, 0.5),
    ],
    [books]
  );

  return (
    <div>
      {/* Головне меню сайту */}
      <Menu />

      {/* Карусель новин */}
      <section>
        <CustomCarousel slides={news} />
      </section>

      {/* Перший блок книг - "Відібране" */}
      <section>
        <NarrowGallery
          books={groups[0]}
          cardComponent={(book) => <PurchaseBookCard book={book} />}
          header="Відібране"
        />
      </section>

      {/* Другий блок книг - "Популярне" */}
      <section>
        <NarrowGallery
          books={groups[1]}
          cardComponent={(book) => <PurchaseBookCard book={book} />}
          header="Популярне"
        />
      </section>

      {/* Третій блок книг - "Нове" */}
      <section>
        <NarrowGallery
          books={groups[2]}
          cardComponent={(book) => <PurchaseBookCard book={book} />}
          header="Нове"
        />
        {/* Кнопка "Більше" під галереєю */}
        <div className="d-flex justify-content-center">
          <Button variant="light mt-5 thin-section">Більше</Button>
        </div>
      </section>

      {/* Футер сайту */}
      <Footer />
    </div>
  );
}

export default App;
