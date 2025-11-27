import { useRef, useState, useEffect, FC } from "react";
import Arrow from "assets/svg/Arrow";
import styles from "./index.module.scss";

interface DropdownFilterProps {
  title: string;
  items: string[];
  onFilter: (attributeName: string, value: string, checked: boolean) => void;
}

const DropdownFilter: FC<DropdownFilterProps> = ({
  title,
  items,
  onFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  const toggleDropdown = () => {
    if (window.innerWidth >= 960) {
      return;
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (window.innerWidth >= 960) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight + 60}px` : "0px");
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
          <label key={item}>
            <input
              type="checkbox"
              onChange={(e) => onFilter(title, item, e.target.checked)}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownFilter;
