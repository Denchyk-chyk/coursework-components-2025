import { Nav, NavLink } from "react-bootstrap";
import './Styles.css';
import { useContext } from "react";
import { CartContext } from "../../logic/Contexts";

const CartIcon = () => {
    const {cart} = useContext(CartContext);

    return (
        <Nav.Link as={NavLink} to={'/'}>
            <div className="cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-cart-fill" viewBox="0 -3 23 23">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                {cart.length > 0 &&
                <div className="counter bg-danger rounded-4">
                    <p>{cart.length}</p>
                </div>}
            </div>
        </Nav.Link>
    );
}

export default CartIcon;
