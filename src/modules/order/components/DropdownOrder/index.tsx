import { FC } from "react";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  // console.log(list);
  // console.log(title);
  
  

  return (
    <select
      className={styles.dropdown}
      onChange={(e) => onSetTitle(e.target.value)}
      value={selected || ""}
    >
      <option value="" disabled>
        {title}
      </option>
      {list.map((p) => {
        if (typeof p === "string") {
          return (
            <option key={p} value={p}>
              {p}
            </option>
          );
        }

          return (
          <option key={p.postal_code} value={p.postal_code}>
            {p.city} — {p.postal_code} {p.address || ""}
          </option>
        );
      })}
    </select>
  );};

export default DropdownOrder;
