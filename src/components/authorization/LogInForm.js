import { useContext } from 'react';
import AuthorizationForm from './AuthorizationForm';
import { UserContext } from '../../contexts/UserContext';
import { UsersContext } from '../../contexts/UsersContext';
import { sha512 } from '../../logic/authorization/sha512';
import { loginUser } from '../../logic/authorization/loginUser';

const LogInForm = ({ onSuccess }) => {
  const { setUser } = useContext(UserContext);
  const { users } = useContext(UsersContext);

  // Перевірка коректності введених даних (логін і пароль)
  const validate = async (values) => {
    const login = values['Електронна пошта або номер телефону'];
    const password = values['Пароль'];
    const errors = {};

    // Пошук користувача за email або номером телефону
    const user = users.find(
      (u) => u.email === login || u.phone === login
    );

    // У разі наявності користувача — перевірка пароля
    if (user) {
      const hashedInput = await sha512(password);
      if (user.password !== hashedInput) {
        errors['Пароль'] = 'Неправильний пароль';
      }
    } else {
      errors['Електронна пошта або номер телефону'] = 'Користувача не знайдено';
    }

    return errors;
  };

  // Обробка підтвердження форми при успішній валідації
  const handleSubmit = async (values) => {
    const login = values['Електронна пошта або номер телефону'];
    await loginUser(users, login, setUser, onSuccess);
  };

  return (
    <AuthorizationForm
      header='Вхід'
      alternative='Реєстрація'
      items={[
        {
          type: 'text',
          name: 'Електронна пошта або номер телефону',
        },
        {
          type: 'password',
          name: 'Пароль',
        },
      ]}
      validate={validate}
      onSubmit={handleSubmit}
    />
  );
};

export default LogInForm;
