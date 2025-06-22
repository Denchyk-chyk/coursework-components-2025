import Menu from "../../components/menu/Menu";
import Footer from "../../components/footer/Footer";
import "./Styles.css";
import { useContext, useEffect } from "react";
import { CartContext } from "../../logic/Contexts";
import NarrowGallery from "../../components/gallery/NarrowGallery";
import OrderBookCard from "../../components/gallery/OrderBookCard";
import OrderForm from "../../components/authorization/OrderForm";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Загальна сума замовлення
  const totalPrice = cart.reduce(
    (sum, { book, count }) => sum + book.price * count,
    0
  );

  // Якщо корзина порожня, перенаправити на каталог
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/catalog");
    }
  }, [cart, navigate]);

  return (
    <div id="catalog" className="d-flex flex-column min-vh-100">
      <Menu />

      <section className="pb-0">
        <NarrowGallery
          books={cart}
          header={`Замовлення`}
          cardComponent={(order) => <OrderBookCard order={order} />}
        />
      </section>
      <section>
        <OrderForm
          price={totalPrice}
          onSuccess={() => {
            setCart([]);
            navigate("/");
          }}
        />
      </section>

      <Footer className="mt-auto" />
    </div>
  );
};

export default UserCart;
