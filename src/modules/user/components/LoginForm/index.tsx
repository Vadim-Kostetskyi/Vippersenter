import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

const LoginForm = () => {
  const { t } = useTranslation();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    console.log("Логін:", username);
    console.log("Пароль:", password);
  };

  return (
    <div className={styles.loginForm}>
      <h1>{t("login.login")}</h1>
      <form action="/login" onSubmit={onSubmit} className={styles.form}>
        <label htmlFor="username">
          {t("login.usernameOrEmailAddress")} <span>*</span>
        </label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">
          {t("login.password")} <span>*</span>
        </label>
        <input type="password" id="password" name="password" required />

        <button type="submit">{t("login.logInToSystem")}</button>
      </form>
    </div>
  );
};

export default LoginForm;
