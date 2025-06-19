/* eslint-disable eqeqeq */
import './Styles.css';
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import { BooksContext } from "../../logic/Contexts";
import { CoversContext } from "../../logic/Contexts";
import { GenresContext } from '../../logic/Contexts';
import Footer from '../../components/footer/Footer';
import AuthorizationForm from '../../components/authorization/AuthorizationForm';

const BookEditor = () => {
    const { books, setBooks } = useContext(BooksContext);
    const { covers } = useContext(CoversContext);
    const { genres } = useContext(GenresContext);
    const { id } = useParams();
    const [formValues, setFormValues] = useState({});
    const navigate = useNavigate();

    const book = useMemo(() => {
    if (!books || books.length === 0) return null;

        if (id == -1) {
            return {
                id: Math.max(0, ...books.map(b => b.id)) + 1,
                title: 'Нова книжка',
                author: '',
                genre: genres[0].name,
                subgenre1: genres[0].subgenres[0].name,
                subgenre2: genres[0].subgenres[0].subgenres[0],
                cover: covers[0],
                description: '',
                pageCount: '',
                price: ''
            };
        }

        return books.find(item => item.id == id) || null;
    }, [books, id]);

    useEffect(() => {
    if (book) {
        setFormValues({
            'Назва': book.title,
            'Автор': book.author,
            'Жанр': book.genre,
            'Піджанр 1': book.subgenre1,
            'Піджанр 2': book.subgenre2,
            'Обкладинка': book.cover,
            'Анотація': book.description,
            'Зображення': book.image,
            'Сторінки': book.pageCount,
            'Цна': book.price,
        });
    }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Якщо змінено жанр
        if (name === 'Жанр') {
            const newGenre = genres.find(g => g.name === value);
            const firstSub1 = newGenre?.subgenres?.[0]?.name || '';
            const firstSub2 = newGenre?.subgenres?.[0]?.subgenres?.[0] || '';

            setFormValues(prev => ({
                ...prev,
                'Жанр': value,
                'Піджанр 1': firstSub1,
                'Піджанр 2': firstSub2
            }));
        return;
        }

        // Якщо змінено піджанр 1 — оновити піджанр 2
        if (name === 'Піджанр 1') {
            const genre = genres.find(g => g.name === formValues['Жанр']);
            const sub1 = genre?.subgenres?.find(s => s.name === value);
            const firstSub2 = sub1?.subgenres?.[0] || '';

            setFormValues(prev => ({
                ...prev,
                'Піджанр 1': value,
                'Піджанр 2': firstSub2
            }));
            return;
        }

        // Звичайне оновлення
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    if (!books || books.length === 0 || !book)
        return <div>Завантаження...</div>;

    const selectedGenre = genres.find(g => g.name === formValues['Жанр']);
    const subgenres1 = selectedGenre?.subgenres?.map(s => s.name) || [];

    const selectedSubgenre1 = selectedGenre?.subgenres?.find(s => s.name === formValues['Піджанр 1']);
    const subgenres2 = selectedSubgenre1?.subgenres || [];

    const handleSubmit = (value) => {
        const updatedBook = {
            ...book,
            title: value['Назва'],
            author: value['Автор'],
            genre: value['Жанр'],
            subgenre1: value['Піджанр 1'],
            subgenre2: value['Піджанр 2'],
            cover: value['Обкладинка'],
            description: value['Анотація'],
            image: value['Зображення'],
            pageCount: Number(value['Сторінки']),
            price: Number(value['Цна'])
        };

        // Збереження книжки в контекст:
        console.log(updatedBook);
        setBooks(prev => {
            const exists = prev.some(b => b.id == updatedBook.id);
            if (exists) {
                return prev.map(b => b.id == updatedBook.id ? updatedBook : b);
            } else {
                return [...prev, updatedBook];
            }
        });

        // Вихід
        navigate('/');
    };


    return (
        <div>
            <Menu/>
            <section>
            <AuthorizationForm
            header={book.title}
            items={[
                { id: 'title', type: 'text', name: 'Назва' },
                { id: 'author', type: 'text', name: 'Автор' },
                { id: 'genre', type: 'select', name: 'Жанр', options: genres.map(g => g.name) },
                { id: 'subgenre1', type: 'select', name: 'Піджанр 1', options: subgenres1 },
                { id: 'subgenre2', type: 'select', name: 'Піджанр 2', options: subgenres2 },
                { id: 'cover', type: 'select', name: 'Обкладинка', options: covers },
                { id: 'description', type: 'textarea', name: 'Анотація', rows: 5 },
                { id: 'image', type: 'text', name: 'Зображення' },
                { id: 'pages', type: 'number', name: 'Сторінки' },
                { id: 'price', type: 'number', name: 'Цна' }
            ]}
            onChange={handleChange}
            outerValues={formValues}
            onSubmit={handleSubmit} />
            </section>
            <Footer/>
        </div>
    );
}

export default BookEditor;
