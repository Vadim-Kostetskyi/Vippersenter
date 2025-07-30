import { FC } from "react";
import styles from "./index.module.scss";

interface InputFieldProps {
  type?: string
  title: string;
  placeholder: string;
  require?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  type,
  title,
  placeholder,
  require,
}) => {
  return (
    <label className={styles.inputField}>
      {title}
      {require && <span className={styles.require}> *</span>}
      <input
        type={type || "text"}
        placeholder={placeholder}
        className={styles.input}
        required={require}
      />
    </label>
  );
};

export default InputField