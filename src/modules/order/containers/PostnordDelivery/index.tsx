import { useTranslation } from "react-i18next";
import InputField from "components/InputField";
import { inputs } from "./data";
import styles from "./index.module.scss";

const PostnordDelivery = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.postnordDelivery}>
      {inputs.map(({ title, placeholder, type }) => (
        <InputField
          key={title}
          type={type}
          title={t(`order.${title}`)}
          placeholder={placeholder ? t(`order.${placeholder}`) : ""}
          require={true}
        />
      ))}
    </div>
  );
};

export default PostnordDelivery