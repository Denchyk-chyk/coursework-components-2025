import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./components/basics/Styles.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/app/App";
import { UsersContext } from "./logic/Contexts";
import { UserContext } from "./logic/Contexts";
import { BooksContext } from "./logic/Contexts";
import { AuthorsContext } from "./logic/Contexts";
import { PublishersContext } from "./logic/Contexts";
import { GenresContext } from "./logic/Contexts";
import { CoversContext } from "./logic/Contexts";
import { CartContext } from "./logic/Contexts";
import BookData from "./pages/book-data/BookData";
import BookEditor from "./pages/book-editor/BookEditor";
import Catalog from "./pages/catalog/Catalog";
import { loadLines } from "./logic/loading/loadLines";
import { loadBooks } from "./logic/loading/loadBooks";
import { loadJson } from "./logic/loading/loadJson";
import UserCart from "./pages/cart/UserCart";
import Authorization from "./pages/authorization/Authorization";
import AboutUs from "./pages/articles/About";
import Faq from "./pages/articles/Faq";
import Collaboration from "./pages/articles/Collaboration";
import FirstNews from "./pages/articles/FirstNews";
import SecondNews from "./pages/articles/SecondNews";
import ThirdNews from "./pages/articles/ThirdNews";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/book", element: <BookData /> },
  { path: "/book/:id", element: <BookData /> },
  { path: "/book-editor/:id", element: <BookEditor /> },
  { path: "/catalog", element: <Catalog /> },
  { path: "/catalog/:genre", element: <Catalog /> },
  { path: "/authorization/:type/:nextPage?", element: <Authorization /> },
  { path: "/cart", element: <UserCart /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/faq", element: <Faq /> },
  { path: "/collaboration", element: <Collaboration /> },
  { path: "/first-news", element: <FirstNews /> },
  { path: "/second-news", element: <SecondNews /> },
  { path: "/third-news", element: <ThirdNews /> },
]);

function Root() {
  const [users, setUsers] = useState([
    {
      name: "Test User",
      email: "testcustomer@gmail.com",
      birthDate: "27.02.2003",
      tel: "+380123456789",
      password:
        "739bf2b906b5cd20b19d9b99d2075c91dbd9859f43ed7e4b67edce6c2bbe36ce66b4c9bea84cf801d7db29ab2055413bb3e4dff6d9cc5d399237b63e78a614ce",
      role: "user",
    },
    {
      name: "Admin",
      email: "bookstoreadmin@gmail.com",
      birthDate: "13.04.1998",
      tel: "+380987654321",
      password:
        "31a556961f3438f9f632ca27812d22228e98e5083eea2bf9b78d0bb374d44deb0dc4d1bc16ab64127eb74e8452ea6902d97937c28310a7ab62a9ae1c15d96d69",
      role: "admin",
    },
  ]);

  const [user, setUser] = useState(users[1]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [covers, setCovers] = useState([]);
  const [genres, setGenres] = useState(null);
  const [descriptions, setDescriptions] = useState([]);
  const [names, setNames] = useState([]);
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function loadData() {
      setAuthors(await loadLines("books/Authors.txt"));
      setPublishers(await loadLines("books/Publishers.txt"));
      setCovers(await loadLines("books/Covers.txt"));
      setGenres(await loadJson("books/Genres.json"));
      setDescriptions(await loadLines("books/Descriptions.txt"));
      setNames(await loadLines("books/Names.txt"));
    }
    loadData();
  }, []);

  useEffect(() => {
    async function loadBooksData() {
      if (
        authors.length > 0 &&
        publishers.length > 0 &&
        covers.length > 0 &&
        genres &&
        descriptions.length > 0 &&
        names.length > 0
      ) {
        const loadedBooks = await loadBooks(
          "/books/Books.txt",
          names,
          authors,
          genres,
          covers,
          descriptions,
          "/books/images/image",
          publishers
        );
        setBooks(loadedBooks);
      }
    }
    loadBooksData();
  }, [authors, publishers, covers, genres, descriptions, names]);

  return (
    <React.StrictMode>
      <UsersContext.Provider value={{ users, setUsers }}>
        <UserContext.Provider value={{ user, setUser }}>
          <AuthorsContext.Provider value={{ authors, setAuthors }}>
            <PublishersContext.Provider value={{ publishers, setPublishers }}>
              <GenresContext.Provider value={{ genres }}>
                <CoversContext.Provider value={{ covers, setCovers }}>
                  <BooksContext.Provider value={{ books, setBooks }}>
                    <CartContext.Provider value={{ cart, setCart }}>
                      <RouterProvider router={router} />
                    </CartContext.Provider>
                  </BooksContext.Provider>
                </CoversContext.Provider>
              </GenresContext.Provider>
            </PublishersContext.Provider>
          </AuthorsContext.Provider>
        </UserContext.Provider>
      </UsersContext.Provider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
