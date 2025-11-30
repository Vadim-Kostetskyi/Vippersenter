import { TFunction } from "i18next";

const CategoryNames = (t: TFunction<"translation", undefined>) => {
  const list = [
    {
      key: "falseEyelashes",
      label: t("categories.falseEyelashes"),
      labelEng: "False Eyelashes",
    },
    {
      key: "glueForEyelashes",
      label: t("categories.glueForEyelashes"),
      labelEng: "Glue For Eyelashes",
    },
    { key: "remover", label: t("categories.remover"), labelEng: "Remover" },
    {
      key: "preparations",
      label: t("categories.preparations"),
      labelEng: "Preparations",
    },
  ];

  const byKey = Object.fromEntries(list.map((item) => [item.key, item.label]));

  return { list, byKey };
};

export default CategoryNames;
