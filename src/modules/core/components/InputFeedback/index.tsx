import React, { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Form } from "modules/core/containers/Feedback";
import { FormProps } from "modules/core/containers/Feedback/data";
import styles from "./index.module.scss";

interface InputFeedbackProps extends FormProps {
  errors?: FieldErrors<Form>;
  register: UseFormRegister<Form>;
}

const InputFeedback: FC<InputFeedbackProps> = ({
  title,
  name,
  type,
  errors,
  register,
  isTextarea,
}) => (
  <div className={styles.inputBox}>
    <label>{title}</label>
    {!isTextarea ? (
      <input
        {...register(name, { required: true })}
        className={styles.input}
        type={type}
      />
    ) : (
      <textarea
        {...register(name, { required: true })}
        className={styles.input}
        cols={30}
        rows={10}
      />
    )}
    {errors && errors[name] ? (
      <p className={errors && errors[name] ? styles.error : styles.notError}>
        Please enter your {title}
      </p>
    ) : null}
  </div>
);

export default InputFeedback;
