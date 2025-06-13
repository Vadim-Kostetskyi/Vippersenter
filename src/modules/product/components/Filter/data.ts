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

export const subCategories: {
  [key: string]: SubCategoryItem[];
}[] = [
  {
    glueForEyelashes: [
      {
        label: "volume",
        items: ["10г", "3г", "5г"],
      },
    ],
  },
  {
    falseEyelashes: [
      {
        label: "bend",
        items: ["B", "C", "CC", "D", "L", "L SOFT", "LC", "M"],
      },
      {
        label: "length",
        items: [
          "10mm",
          "11mm",
          "12mm",
          "13mm",
          "14mm",
          "4-7mm",
          "5mm",
          "6-13mm",
          "6mm",
          "7mm",
          "8mm",
          "9mm",
        ],
      },
      {
        label: "thickness",
        items: ["0.07", "0.1"],
      },
    ],
  },
];
