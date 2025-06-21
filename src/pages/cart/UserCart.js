import Menu from "../../components/menu/Menu";
import Footer from "../../components/footer/Footer";
import "./Styles.css";
import { useContext } from "react";
import { CartContext } from "../../logic/Contexts";
import NarrowGallery from "../../components/gallery/NarrowGallery";
import OrderBookCard from "../../components/gallery/OrderBookCard";
import OrderForm from "../../components/authorization/OrderForm";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
    const { cart, setCart } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div id='catalog' className='d-flex flex-column min-vh-100'>
            <Menu />

            <section>
                <NarrowGallery books={cart} header='Замовлення' cardComponent={(entity) => 
                    <OrderBookCard book={entity.book} count={entity.count}/>} />
            </section>
            <section>
                <OrderForm onSuccess={() => {
                    setCart([]);
                    navigate('/');
                }}/>
            </section>

            <Footer className='mt-auto' />
        </div>
    );
}

export default UserCart;
