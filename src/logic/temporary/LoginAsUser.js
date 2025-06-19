import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

function LoginAsUser() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    window.logInAsCustomer = () => {
      setUser({ name: "Customer", role: "user" });
      console.log("User set to admin");
    };
  }, [setUser]);

  return null;
}

export default LoginAsUser;
