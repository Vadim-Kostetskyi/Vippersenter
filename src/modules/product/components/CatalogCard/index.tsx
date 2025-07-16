import { FC } from "react"
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

interface CatalogCardProps{
  title: string,
  image?: string
  link: string
}

const CatalogCard: FC<CatalogCardProps> = ({ title, image, link }) => (
  <Link className={styles.catalogCard} to={link}>
    <div className={styles.imageWrapper}>
      <img src={image} alt={link} />
    </div>
    <h3>{title}</h3>
  </Link>
);

export default CatalogCard