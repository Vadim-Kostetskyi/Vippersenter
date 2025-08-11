import { FC, useState } from "react";
import ArrowTriangle from "assets/svg/ArrowTriangle";
import styles from "./index.module.scss";

interface DropdownProps {
  title: string;
  list: any[];
  selected: string;
  onSetTitle: (item: string) => void;
}

const DropdownOrder: FC<DropdownProps> = ({
  title,
  list,
  selected,
  onSetTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSendInfo = (item: string) => {
    onSetTitle(item);
    handleOpen();
  };  

  return (
    <div className={styles.dropdown}>
      <h4>{title}</h4>
      <button className={styles.button} onClick={handleOpen}>
        <span>
          {selected}
          <ArrowTriangle className={isOpen ? styles.open : styles.arrow} />
        </span>
        {isOpen && (
          <div className={styles.list}>
            <input type="text" />
            {list.map((label) => (
              <button key={label} onClick={() => onSendInfo(label)}>
                {label}
              </button>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};

export default DropdownOrder;
