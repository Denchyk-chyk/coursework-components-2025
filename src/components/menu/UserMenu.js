import { Button, Nav, NavLink } from "react-bootstrap";
import './Styles.css';
import { useContext } from "react";
import { UserContext } from "../../logic/Contexts";

const UserMenu = () => {
    const { user } = useContext(UserContext);
    
    return (
        user ? 
        <div>
            <Nav.Link as={NavLink} to='/'>{user.name}</Nav.Link>
        </div> :
        <div>
            <Button variant="link">Вхід</Button>
            <Button variant="outline-danger">Реєстрація</Button>
        </div>
    );
}

export default UserMenu;
