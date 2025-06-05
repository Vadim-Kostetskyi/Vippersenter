import LoginForm from "modules/user/components/LoginForm";
import LoginImage from "assets/image/login-bg.jpg";
import styles from "./index.module.scss";

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.formBox}>
        <LoginForm />
      </div>
      <div className={styles.imageBox}>
        <img src={LoginImage} alt="login-bg" className={styles.image} />
      </div>
    </div>
  );
};

export default Login;
