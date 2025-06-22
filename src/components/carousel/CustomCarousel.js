import Carousel from "react-bootstrap/Carousel";
import "./Styles.css";
import ArrowButton from "../basics/ArrowButton";
import { useNavigate } from "react-router-dom";

function CustomCarousel({ slides }) {
  const navigate = useNavigate();

  return (
    <Carousel
      prevIcon={<ArrowButton direction="left" />}
      nextIcon={<ArrowButton direction="right" />}
    >
      {slides.map((s, i) => (
        <Carousel.Item key={i}>
          <Carousel.Caption>
            <h1>{s.title}</h1>
            <div className="d-flex justify- content-center align-items-center">
              <p className="fs-5 m-auto mb-2">{s.desc}</p>
            </div>
          </Carousel.Caption>
          <picture onClick={() => navigate(s.path)}>
            <source media="(max-width: 600px)" srcSet={s.images[1]} />
            <img src={s.images[0]} alt={"Slide " + { i }} />
          </picture>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CustomCarousel;
