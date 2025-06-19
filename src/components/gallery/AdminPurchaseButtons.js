import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../../logic/Contexts';
import PurchaseButton from './PurchaseButton';
import { Link } from 'react-router-dom';

// Компонент для відображення кнопок придбання
// Для адміністратора надається додаткова кнопка переходу до редагування книги
// Для звичайного користувача використовується стандартна кнопка придбання

function AdminPurchaseButtons({ book }) {
    const { user } = useContext(UserContext);

    // Перевірка прав доступу: якщо користувач адміністратор
    if (user && user.role === 'admin') {
        return (
            <div className='half-wrapper'>
                <div className='half'>
                    <PurchaseButton book={book} />
                </div>
                <div>
                    <Link to={`/book-editor/${book.id}`}>
                        <Button variant='secondary'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='currentColor'
                                className='bi bi-pencil-fill' viewBox='0 0 16 16'>
                                <path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z' />
                            </svg>
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Повернення базової кнопки придбання для неадміністратора
    return <PurchaseButton book={book} />;
}

export default AdminPurchaseButtons;
