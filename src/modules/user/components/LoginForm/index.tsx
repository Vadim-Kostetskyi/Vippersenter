import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./index.module.scss";
import { useLoginUserMutation } from "storeRedux/authApi";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const onLoginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("username") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get("rememberMe") === "on";

    try {
      const data = await loginUser({ email, password, rememberMe }).unwrap();

      if (data.token) {
        if (rememberMe) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className={styles.loginForm}>
      <h1>{t("login.login")}</h1>
      <form action="/login" onSubmit={onLoginUser} className={styles.form}>
        <label htmlFor="username">
          {t("login.usernameOrEmailAddress")} <span>*</span>
        </label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">
          {t("login.password")} <span>*</span>
        </label>
        <input type="password" id="password" name="password" required />
        <div className={styles.checkbox}>
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label htmlFor="rememberMe">{t("login.rememberMe")}</label>
        </div>

        <button type="submit">{t("login.logInToSystem")}</button>
      </form>
    </div>
  );
};

export default LoginForm;
