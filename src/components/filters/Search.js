import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

// Компонент пошуку книг за назвою
// Поле введення використовується для фільтрації масиву books
// Результати записуються у setFound

const Search = ({ books, setFound }) => {
    const [query, setQuery] = useState(''); // Поточне значення рядка пошуку

    // Обробка пошуку по назві книги (без урахування регістру)
    const doSearch = () => {
        const lowered = query.toLowerCase();
        const result = books.filter(book =>
            book.title.toLowerCase().includes(lowered)
        );
        setFound(result);
    };

    useEffect(() => {
        // Оновлення результатів при зміні масиву книг
        // Якщо запит порожній — повертається повний список
        if (query.trim() === '') {
            setFound(books);
        } else {
            doSearch();
        }
    }, [books]);

    return (
        <Form className='d-flex justify-content-center' onSubmit={e => e.preventDefault()}>
            <div className='thin-section'>
                <div className='half-wrapper'>
                    <Form.Control
                        type='text'
                        placeholder='Назва'
                        className='fs-5 half'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <Button
                        variant='secondary'
                        className='d-inline-block fs-5'
                        onClick={doSearch}>
                        Знайти
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default Search;
