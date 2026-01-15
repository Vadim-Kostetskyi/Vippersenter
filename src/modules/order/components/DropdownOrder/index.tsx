import { FC } from "react";
import styles from "./index.module.scss";

interface DropdownProps {
  title: string;
  list: any[];
  selected: string;
  onSetTitle: (item: string) => void;
  posten?: boolean;
}

const DropdownOrder: FC<DropdownProps> = ({
  title,
  list,
  selected,
  onSetTitle,
  posten,
}) => (
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

      if (posten) {
        return (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        );
      }

      return (
        <option key={p.id} value={p.id}>
          {p.name} — {p.address || ""}, {p.city} ({p.postalCode})
        </option>
      );
    })}
  </select>
);

export default DropdownOrder;
