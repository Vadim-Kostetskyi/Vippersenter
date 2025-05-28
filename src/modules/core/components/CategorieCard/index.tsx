import Arrow from "assets/svg/Arrow";
import { FC } from "react";
import styles from "./index.module.scss";

interface CategoryCardProps {
  image: string;
  categoryName: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ image, categoryName }) => {
  return (
    <div className={styles.wrapper}>
      <img src={image} alt={categoryName} />
      <div className={styles.textContainer}>
        <div className={styles.textBox}>
          <span>{categoryName}</span>
          <div className={styles.arrowBox}>
            <Arrow className={styles.arrow} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
