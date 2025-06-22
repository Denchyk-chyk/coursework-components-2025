import Carousel from "react-bootstrap/Carousel";
import "./Styles.css";
import ArrowButton from "../basics/ArrowButton";
import { useNavigate } from "react-router-dom";

// Карусель з кастомними стрілками та підтримкою клікабельних слайдів
const CustomCarousel = ({ slides }) => {
  const navigate = useNavigate(); // Хук для переходу між маршрутами

  return (
    <Carousel
      prevIcon={<ArrowButton direction="left" />} // Кастомна ліва стрілка
      nextIcon={<ArrowButton direction="right" />} // Кастомна права стрілка
    >
      {slides.map((s, i) => (
        <Carousel.Item key={i}>
          <Carousel.Caption>
            {/* Заголовок слайду */}
            <h1>{s.title}</h1>
            <div className="d-flex justify- content-center align-items-center">
              <p className="fs-5 m-auto mb-2">{s.desc}</p> {/* Опис слайду */}
            </div>
          </Carousel.Caption>

          {/* Картинка, яка клікається й переводить за шляхом слайду */}
          <img
            src={s.image}
            alt={"Slide " + i}
            onClick={() => navigate(s.path)}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
