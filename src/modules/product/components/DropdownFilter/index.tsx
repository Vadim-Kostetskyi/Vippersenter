import { useRef, useState, useEffect, FC } from "react";
import styles from "./index.module.scss";
import Arrow from "assets/svg/Arrow";

interface DropdownFilterProps {
  title: string;
  items: string[];
}

const DropdownFilter: FC<DropdownFilterProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className={styles.dropdown}>
      <div className={styles.trigger} onClick={toggleDropdown}>
        <h2>{title}</h2>
        <Arrow
          className={`${styles.arrowImg} ${isOpen ? styles.arrowImgOpen : ""}`}
        />
      </div>

      <div
        ref={contentRef}
        className={`${styles.list} ${isOpen ? styles.open : ""}`}
        style={{ maxHeight: height }}
      >
        {items.map((item) => (
          <label>
            <input type="checkbox" />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownFilter;
