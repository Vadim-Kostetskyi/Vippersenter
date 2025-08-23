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
            <option key={p.id} value={p.id}>
              {p.name} — {p.address || ""}, {p.city}
            </option>
          );
      })}
    </select>
  );};

export default DropdownOrder;
