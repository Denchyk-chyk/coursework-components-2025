import "./Styles.css";
import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import { BooksContext } from "../../logic/Contexts";
import { Col, Row } from "react-bootstrap";
import PurchaseBookCard from "../../components/gallery/PurchaseBookCard";
import NarrowGallery from "../../components/gallery/NarrowGallery";
import Footer from "../../components/footer/Footer";
import AdminPurchaseButtons from "../../components/gallery/AdminPurchaseButtons";

const BookData = () => {
  const { id } = useParams();
  const { books } = useContext(BooksContext);

  // пошук книги по id при зміні books або id
  const book = useMemo(() => {
    if (!books || books.length === 0) return null;
    // eslint-disable-next-line eqeqeq
    return books.find((item) => item.id == id) || null;
  }, [books, id]);

  // список рекомендованих книг на основі жанру
  const recommended = useMemo(() => {
    if (!book || !book.genre) return [];

    // фільтрація книг за тим самим жанром, виключаючи поточну
    const sameGenre = books.filter(
      // eslint-disable-next-line eqeqeq
      (b) => b.genre === book.genre && b.id != book.id
    );

    // випадкове перемішування
    const shuffled = [...sameGenre].sort(() => Math.random() - 0.5);

    // повертається половина
    return shuffled.slice(0, Math.ceil(shuffled.length / 2));
  }, [books, book]);

  // якщо книги не завантажені, не відображати нічого
  if (!books || books.length === 0) return <></>;

  const fields = [
    { name: "Автор", value: book.author || "Невідомий" },
    { name: "Видавництво", value: book.publisher || "Невідоме" },
    { name: "Обкладинка", value: book.cover || "Відсутня" },
    { name: "Сторінки", value: book.pageCount || "Невідомо" },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Menu />
      <section>
        <div className="d-flex justify-content-center align-items-center">
          <div className="book-data-section">
            <h1>{book.title}</h1>
            <div className="book-data shadow bg-white p-4 rounded-3">
              <div className="d-flex justify-content-center align-items-center">
                {/* відображення обкладинки книги */}
                <img src={book.image} alt="Book" />
              </div>
              <div className="stretched ms-3">
                {/* інформація про автора, видавництво, обкладинку */}
                {fields.map((field, i) => (
                  <div key={i} className="group">
                    <Row xs={1} md={2} className="mb-3">
                      <Col key="name" className="mt-0">
                        <p className="mt-0 mb-0">{field.name}</p>
                      </Col>
                      <Col key="value" className="mt-0">
                        <p className="fw-medium mt-1 mb-0">{field.value}</p>
                      </Col>
                    </Row>
                  </div>
                ))}
                <h3 className="mt-auto">Анотація</h3>
                {/* опис книги */}
                <p className="text-muted mb-2 anotation">{book.description}</p>
                <div className="d-flex flex-wrap">
                  {/* жанри книги */}
                  {[book.genre, book.subgenre1, book.subgenre2].map((g, i) => (
                    <p key={i} className="fw-medium me-4 mb-2 text-nowrap">
                      {g}
                    </p>
                  ))}
                </div>
                {/* ціна книги */}
                <p className="fs-4 fw-bolder mt-auto">{book.price} грн</p>
                {/* кнопка додавання в кошик */}
                <AdminPurchaseButtons book={book} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* галерея рекомендованих книг */}
        <NarrowGallery
          cardComponent={(book) => <PurchaseBookCard book={book} />}
          books={recommended}
          header={"Схоже"}
        />
      </section>
      <Footer className="mt-auto" />
    </div>
  );
};

export default BookData;
