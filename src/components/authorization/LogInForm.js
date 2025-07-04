import { useContext } from "react";
import CustomForm from "./CustomForm";
import { UserContext } from "../../logic/Contexts";
import { UsersContext } from "../../logic/Contexts";
import { sha512 } from "../../logic/authorization/sha512";
import { loginUser } from "../../logic/authorization/loginUser";
import { useNavigate } from "react-router-dom";

// Форма для входу користувача
const LogInForm = ({ onSuccess, SighnUpAddress }) => {
  const { setUser } = useContext(UserContext);
  const { users } = useContext(UsersContext);
  const navigate = useNavigate();

  // Перевірка коректності введених даних (логін і пароль)
  const validate = async (values) => {
    const login = values["Електронна пошта або номер телефону"];
    const password = values["Пароль"];
    const errors = {};

    // Пошук користувача за email або номером телефону
    const user = users.find((u) => u.email === login || u.phone === login);

    // У разі наявності користувача — перевірка пароля
    if (user) {
      const hashedInput = await sha512(password);
      if (user.password !== hashedInput) {
        errors["Пароль"] = "Неправильний пароль";
      }
    } else {
      errors["Електронна пошта або номер телефону"] = "Користувача не знайдено";
    }

    return errors;
  };

  // Обробка підтвердження форми при успішній валідації
  const handleSubmit = async (values) => {
    const login = values["Електронна пошта або номер телефону"];
    await loginUser(users, login, setUser, onSuccess);
  };

  return (
    <CustomForm
      header="Вхід"
      alternative="Реєстрація"
      alternativeAction={() => navigate(SighnUpAddress)}
      items={[
        {
          type: "text",
          name: "Електронна пошта або номер телефону",
        },
        {
          type: "password",
          name: "Пароль",
        },
      ]}
      validate={validate}
      onSubmit={handleSubmit}
    />
  );
};

export default LogInForm;
