import { TFunction } from "i18next";

const CategoryNames = (t: TFunction<"translation", undefined>) => {
  const list = [
    { key: "falseEyelashes", label: t("categories.falseEyelashes") },
    { key: "glueForEyelashes", label: t("categories.glueForEyelashes") },
    { key: "remover", label: t("categories.remover") },
    { key: "preparations", label: t("categories.preparations") },
  ];

  const byKey = Object.fromEntries(list.map((item) => [item.key, item.label]));

  return { list, byKey };
};

export default CategoryNames;
