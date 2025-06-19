import { useContext, useState } from 'react';
import { GenresContext } from '../../logic/Contexts';
import FilterSection from './FilterSection';
import { Button } from 'react-bootstrap';

// Компонент вузла жанру з можливістю розгортання піджанрів
// Якщо вузол має дочірні піджанри, відображається секція з кнопкою-розгортання
// При натисканні на заголовок виконується вибір жанру через onSelect

const GenreNode = (props) => {
    const [isOpen, setIsOpen] = useState(false); // Стан розгортання вузла
    const toggleOpen = () => setIsOpen(!isOpen);

    const { node, onSelect, className } = props;
    const hasChildren = Array.isArray(node.subgenres) && node.subgenres.length > 0;

    // Обробка кліку по заголовку для вибору жанру
    const handleHeaderClick = () => {
        onSelect?.(node.name);
    };

    if (hasChildren) {
        return (
            <FilterSection
                className={className}
                isOpen={isOpen}
                toggleOpen={toggleOpen}
                headerTag={
                    <Button
                        variant='link'
                        className='text-start w-100'
                        onClick={handleHeaderClick}
                    >
                        {node.name}
                    </Button>
                }
            >
                {node.subgenres.map((child, idx) => (
                    <GenreNode
                        key={idx}
                        node={child}
                        className='ms-2 mb-2'
                        onSelect={onSelect}
                    />
                ))}
            </FilterSection>
        );
    }

    return (
        <Button
            variant='link'
            className='text-start ps-2 ms-3 mb-2 d-block'
            onClick={() => onSelect?.(node)}
        >
            {node}
        </Button>
    );
};

// Аккордеон жанрів, що відображає кореневі жанри з можливістю вибору
// Дані жанрів отримуються через контекст GenresContext

const GenreAccordion = ({ onSelect }) => {
    const { genres } = useContext(GenresContext);

    return (
        <div className='genre-accordion'>
            {genres?.map((genre, idx) => (
                <GenreNode
                    key={idx}
                    node={genre}
                    className='mb-2'
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default GenreAccordion;
