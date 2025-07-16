import { useTranslation } from "react-i18next";
import CategoryNames from "components/CategoryNames";
import CatalogCard from "../components/CatalogCard";
import eyelashesImg from "assets/image/category/dyzayn-bez-nazvy.png"; 
import glueImg from "assets/image/category/img_3911-scaled.jpg"; 
import medicationsImg from "assets/image/category/cc12bb1e-f27d-4350-94d9-976e9f0eb6d6.jpg"; 
import removersImg from "assets/image/category/img_3912-scaled.jpg"; 
import styles from "./index.module.scss";

const Catalog = () => {
  const {t} = useTranslation()
  const { list } = CategoryNames(t);
  const images =[ eyelashesImg, glueImg, removersImg, medicationsImg]
  
  return (
      <div className={styles.catalog}>
        {list.map(({ key, label }, index) => (
          <CatalogCard title={label} image={images[index]} link={key} />
        ))}
      </div>
  );
}

export default Catalog