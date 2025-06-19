import { Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { GenresContext } from '../../logic/Contexts';

const GenreDropdown = (props) => {
    const { genres } = useContext(GenresContext);
    const [openSub, setOpenSub] = useState(null);
    const [openSubSub, setOpenSubSub] = useState(null);

    const handleSelect = (name) => {
        if (props.onSelect) {
            props.onSelect(name);
        }
    };

    return (
        <Nav>
            <NavDropdown title={props.title || 'Книги'} id='genre-dropdown'>
                {Array.isArray(genres) && genres.map((genre, i) => (
                    <Dropdown
                        key={i}
                        drop='end'
                        onMouseEnter={() => setOpenSub(i)}
                        onMouseLeave={() => setOpenSub(null)}
                        show={openSub === i}
                    >
                        <Dropdown.Toggle
                            as='div'
                            className='dropdown-item'
                            onClick={() => handleSelect(genre.name)}
                        >
                            {genre.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {genre.subgenres.map((sub, j) => (
                                Array.isArray(sub.subgenres) && sub.subgenres.length > 0 ? (
                                    <Dropdown
                                        key={j}
                                        drop='end'
                                        onMouseEnter={() => setOpenSubSub(j)}
                                        onMouseLeave={() => setOpenSubSub(null)}
                                        show={openSubSub === j}
                                    >
                                        <Dropdown.Toggle
                                            as='div'
                                            className='dropdown-item'
                                            onClick={() => handleSelect(sub.name)}
                                        >
                                            {sub.name}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {sub.subgenres.map((subsub, k) => (
                                                <Dropdown.Item
                                                    key={k}
                                                    onClick={() => handleSelect(subsub)}
                                                >
                                                    {subsub}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                ) : (
                                    <Dropdown.Item
                                        key={j}
                                        onClick={() => handleSelect(sub.name)}
                                    >
                                        {sub.name}
                                    </Dropdown.Item>
                                )
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                ))}
            </NavDropdown>
        </Nav>
    );
};

export default GenreDropdown;
