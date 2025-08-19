import { FC } from "react";
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
}) => (
  <select
    className={styles.dropdown}
    onChange={(e) => onSetTitle(e.target.value)}
    value={selected || ""}
  >
    <option value="" disabled>
      {title}
    </option>
    {list.map((p) => (
      // <option key={p.id} value={p.id}>
      //   {p.name} — {p.address}, {p.city}
      // </option>
      <option key={p} value={p}>{p}</option>
    ))}
  </select>
);

export default DropdownOrder;
