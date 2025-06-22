import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import Footer from "../../components/footer/Footer";
import LogInForm from "../../components/authorization/LogInForm";
import SignUpForm from "../../components/authorization/SignUpForm";

const Authorization = () => {
  const { type, nextPage } = useParams();
  const navigate = useNavigate();

  // Обробка помилкового типу (не login і не signup)
  if (type !== "login" && type !== "signup") {
    return <p>Невірний тип авторизації: {type}</p>;
  }

  // Обробка переходу після успішної дії
  const handleSuccess = () => {
    navigate(nextPage ? "/" + nextPage : "/");
  };

  // Альтернативне посилання
  const getAlternativeAddress = () => {
    const newType = type === "login" ? "signup" : "login";
    return `/authorization/${newType}${nextPage ? "/" + nextPage : ""}`;
  };

  return (
    <div id="login" className="d-flex flex-column min-vh-100">
      <Menu />

      <section>
        {type === "login" ? (
          <LogInForm
            onSuccess={handleSuccess}
            alternative="Ще не маєте акаунта? Зареєструйтесь"
            SighnUpAddress={getAlternativeAddress()}
          />
        ) : (
          <SignUpForm
            onSuccess={handleSuccess}
            alternative="Уже маєте акаунт? Увійдіть"
            LogInAddress={getAlternativeAddress()}
          />
        )}
      </section>

      <Footer className="mt-auto" />
    </div>
  );
};

export default Authorization;
