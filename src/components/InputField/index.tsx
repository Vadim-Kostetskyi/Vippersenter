import { ChangeEventHandler, FC, KeyboardEventHandler } from "react";
import styles from "./index.module.scss";

interface InputFieldProps {
  type?: string;
  title: string;
  placeholder: string;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  require?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  type,
  title,
  placeholder,
  require,
  onChange,
  value,
  onKeyDown,
}) => {
  return (
    <label className={styles.inputField}>
      {title}
      {require && <span className={styles.require}> *</span>}
      <input
        type={type || "text"}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={require}
      />
    </label>
  );
};

export default InputField