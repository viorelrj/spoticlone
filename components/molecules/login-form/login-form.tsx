import { useEffect } from "react";

import { login } from "./login-form.utils";

export const LoginForm = () => {
  useEffect(() => {
    login();
  }, []);

  return <div>Redirecting you</div>;
};

export default LoginForm;
