import { AttributeList, Product } from "storeRedux/types";

export const collectAttributesFromProducts = (
  products: Product[]
): AttributeList[] => {
  const attributesMap = new Map<string, Set<string>>();

  for (const product of products) {
    if (!product.attributes || !Array.isArray(product.attributes)) continue;

    for (const attr of product.attributes) {
      if (attr.attribute_main && attr.value_main) {
        if (!attributesMap.has(attr.attribute_main)) {
          attributesMap.set(attr.attribute_main, new Set());
        }
        attributesMap.get(attr.attribute_main)!.add(attr.value_main);
      }

      if (attr.attribute_secondary && attr.value_secondary) {
        if (!attributesMap.has(attr.attribute_secondary)) {
          attributesMap.set(attr.attribute_secondary, new Set());
        }
        attributesMap.get(attr.attribute_secondary)!.add(attr.value_secondary);
      }

      if (attr.attribute_tertiary && attr.value_tertiary) {
        if (!attributesMap.has(attr.attribute_tertiary)) {
          attributesMap.set(attr.attribute_tertiary, new Set());
        }
        attributesMap.get(attr.attribute_tertiary)!.add(attr.value_tertiary);
      }
    }
  }

  return Array.from(attributesMap.entries()).map(([label, values]) => ({
    label,
    items: Array.from(values),
  }));
};
