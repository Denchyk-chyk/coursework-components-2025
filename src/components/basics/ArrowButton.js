import Button from 'react-bootstrap/Button';

// Кнопка стрілки для навігації галереї
// Напрям визначається параметром direction ('left' або 'right')
// Неактивний стан встановлюється через disabled

function ArrowButton({ direction, disabled, onClick }) {
    return (
        <Button size='sm' variant='secondary' disabled={disabled} onClick={onClick}>
            {direction === 'left' ? '<' : '>'}
        </Button>
    );
}

export default ArrowButton;
