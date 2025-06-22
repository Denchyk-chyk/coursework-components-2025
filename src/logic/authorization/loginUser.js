export const loginUser = (users, login, setUser, onSuccess) => {
  const user = users.find((u) => u.email === login || u.phone === login);

  setUser(user);
  if (onSuccess) {
    onSuccess(user);
  }
};
