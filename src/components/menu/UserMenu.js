import { Button, Nav } from "react-bootstrap";
import './Styles.css';
import { useContext } from "react";
import { UserContext } from "../../logic/Contexts";
import { Link } from 'react-router-dom';

const UserMenu = () => {
    const { user, setUser } = useContext(UserContext);
    
    return (
        user ? 
        <div>
            <Nav.Link onClick={() => setUser(null)}>{user.name}</Nav.Link>
        </div> :
        <div>
            <Link to='/authorization/login/'>
                <Button variant="link">Вхід</Button>
            </Link>
            <Link to='/authorization/signup/'>
                <Button variant="outline-danger">Реєстрація</Button>
            </Link>
        </div>
    );
}

export default UserMenu;
