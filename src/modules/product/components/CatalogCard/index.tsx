import { FC } from "react";
import LangLink from "utils/LangLink";
import styles from "./index.module.scss";

interface CatalogCardProps {
  title: string;
  image?: string;
  link: string;
}

const CatalogCard: FC<CatalogCardProps> = ({ title, image, link }) => (
  <LangLink className={styles.catalogCard} to={link}>
    <div className={styles.imageWrapper}>
      <img src={image} alt={link} />
    </div>
    <h3>{title}</h3>
  </LangLink>
);

export default CatalogCard;
