import { Button } from "react-bootstrap";
import { useContext } from "react";
import { GenresContext } from "../../logic/Contexts";
import { isGenreOrParentSelected } from "../../logic/filtration/isGenreOrParentSelected";
import GenreAccordion from "./GenreAccordion";

// Компонент списку жанрів з можливістю додавання та видалення
// Вибрані жанри відображаються у вигляді кнопок
// Додавання жанру відбувається лише за відсутності його або його батьків у списку

const GenresList = (props) => {
  const { genres } = useContext(GenresContext);

  return (
    <div className="genres-list">
      <GenreAccordion
        title="Додати"
        onSelect={(genre) => {
          if (!isGenreOrParentSelected(genre, props.list, genres)) {
            props.setList([...props.list, genre]);
          }
        }}
      />

      <div className="mt-3">
        {props.list.map((genre) => (
          <Button
            key={genre}
            variant="outline-dark"
            className="me-2 mb-2 rounded-pill"
            onClick={() => props.setList(props.list.filter((e) => e !== genre))}
          >
            {genre}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GenresList;
