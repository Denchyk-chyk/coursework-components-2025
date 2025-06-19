import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

function LoginAsAdmin() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    window.logInAsAdmin = () => {
      setUser({ name: "Admin", role: "admin" });
      console.log("User set to admin");
    };
  }, [setUser]);

  return null;
}

export default LoginAsAdmin;
