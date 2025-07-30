import { AttributesKey, Product, ValueKey } from "storeRedux/types";

const attrValuesTable = (product: Product, value: ValueKey) => {
  return Array.from(new Set(product.attributes?.map((a) => a[value]) || []));
};

interface AttributeTableItem {
  title: "main" | "secondary" | "tertiary";
  attribute: AttributesKey;
  values: (string | undefined)[];
}

export const attributesTable = (product: Product): AttributeTableItem[] => {
  return [
    {
      title: "main",
      attribute: "attribute_main",
      values: attrValuesTable(product, "value_main"),
    },
    {
      title: "secondary",
      attribute: "attribute_secondary",
      values: attrValuesTable(product, "value_secondary"),
    },
    {
      title: "tertiary",
      attribute: "attribute_tertiary",
      values: attrValuesTable(product, "value_tertiary"),
    },
  ];
};

