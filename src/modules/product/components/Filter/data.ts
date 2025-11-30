export interface SubCategoryItem {
  label: string;
  items: string[];
}

export const categories: { [key: string]: string[] }[] = [
  {
    falseEyelashes: [
      "filter.lines20",
      "filter.lines28",
      "categories.falseEyelashes",
    ],
    glueForEyelashes: ["categories.glueForEyelashes"],
    remover: ["categories.remover"],
    preparations: ["categories.preparations"],
  },
];
