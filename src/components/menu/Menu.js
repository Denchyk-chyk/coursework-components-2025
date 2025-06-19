import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import GenreDropdown from './GenreDropdown';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';
import { useContext } from 'react';
import { UserContext } from '../../logic/Contexts';

function Menu() {
    const { user } = useContext(UserContext);

    return (
        <Navbar expand='lg' bg='dark' variant='dark' className='fs-5 pt-2 pb-2'>
            <Container>
                <Navbar.Brand as={NavLink} to='/' className='pe-5 fs-3 fw-bold'>
                    КНИГАРНЯ
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='d-flex align-items-center me-auto'>
                        <GenreDropdown/>   
                        {user && user.role === 'admin' && <Nav.Link as={NavLink} to='/book-editor/-1'>Додати</Nav.Link>}
                        <Nav.Link as={NavLink} to='/t'>Про нас</Nav.Link>
                        <Nav.Link as={NavLink} to='/'>Контакти</Nav.Link>
                    </Nav>
                    <Nav className='d-flex align-items-center'>
                        <CartIcon />
                        <UserMenu />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
