import AuthorizationForm from "./AuthorizationForm";
import { UsersContext } from "../../logic/Contexts";
import { UserContext } from "../../logic/Contexts";
import { useContext } from "react";
import { sha512 } from "../../logic/authorization/sha512";
import { loginUser } from "../../logic/authorization/loginUser";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ onSuccess, LogInAddress }) => {
  const { users, setUsers } = useContext(UsersContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Валідація даних користувача
  const validate = (values) => {
    const errors = {};

    const name = values["Ім'я"];
    const email = values["Електронна пошта"];
    const phone = values["Номер телефону"];
    const password = values["Пароль"];
    const passwordConfirm = values["Повторити пароль"];

    // Перевірка імені: лише латиниця
    if (!/^[A-Za-z]+$/.test(name)) {
      errors["Ім'я"] = "Ім’я повинно містити лише латинські літери";
    }

    // Перевірка формату email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors["Електронна пошта"] = "Неправильний формат електронної пошти";
    }

    // Перевірка формату телефону
    if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
      errors["Номер телефону"] = "Невірний формат номера телефону";
    }

    // Перевірка пароля
    if (!/^[A-Za-z0-9]+$/.test(password)) {
      errors["Пароль"] =
        "Пароль повинен містити лише латинські літери та цифри";
    }

    // Повторення пароля
    if (password !== passwordConfirm) {
      errors["Повторити пароль"] = "Паролі не збігаються";
    }

    return errors;
  };

  // Обробка реєстрації нового користувача
  const handleSubmit = async (values) => {
    const newUser = {
      name: values["Ім'я"],
      email: values["Електронна пошта"],
      birthDate: values["Дата народження"],
      phone: values["Номер телефону"],
      password: await sha512(values["Пароль"]),
    };

    setUsers([...users, newUser]);

    // Використання загальної функції входу після реєстрації
    loginUser([...users, newUser], newUser.email, setUser, onSuccess);
  };

  return (
    <AuthorizationForm
      header="Реєстрація"
      alternative="Вхід"
      alternativeAction={() => navigate(LogInAddress)}
      items={[
        {
          id: "signup-name",
          type: "text",
          name: "Ім'я",
        },
        {
          id: "signup-email",
          type: "email",
          name: "Електронна пошта",
        },
        {
          id: "signup-tel",
          type: "tel",
          name: "Номер телефону",
        },
        {
          id: "signup-password",
          type: "password",
          name: "Пароль",
        },
        {
          id: "signup-password-confirm",
          type: "password",
          name: "Повторити пароль",
        },
        {
          id: "signup-birthdate",
          type: "date",
          name: "Дата народження",
        },
      ]}
      validate={validate}
      onSubmit={handleSubmit}
    />
  );
};

export default SignUpForm;
