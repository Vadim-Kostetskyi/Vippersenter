import { Attribute, SelectedAttributes } from "storeRedux/types";
import { ResultSets } from "types/set";

export const getAvailableAttributeValues = (
  attributes: Attribute[],
  selected: SelectedAttributes[]
): ResultSets => {
  const res: ResultSets = {};

  const matchesParam = (
    attr: Attribute,
    paramName: string,
    paramValue: string
  ): boolean => {
    if (attr.attribute_main === paramName)
      return attr.value_main === paramValue;
    if (attr.attribute_secondary === paramName)
      return attr.value_secondary === paramValue;
    if (attr.attribute_tertiary === paramName)
      return attr.value_tertiary === paramValue;

    return false;
  };

  selected.forEach((target, index) => {
    const targetName = target.parameter;

    if (index === 0) {
      const fullSet = new Set<string>();

      attributes.forEach((attr) => {
        const qty = parseInt(attr.quantity || "0");
        if (qty <= 0) return;

        if (attr.attribute_main === targetName && attr.value_main)
          fullSet.add(attr.value_main);
        if (attr.attribute_secondary === targetName && attr.value_secondary)
          fullSet.add(attr.value_secondary);
        if (attr.attribute_tertiary === targetName && attr.value_tertiary)
          fullSet.add(attr.value_tertiary);
      });

      res[targetName] = fullSet;
      return;
    }

    const others = selected.filter((s) => s.parameter !== targetName);

    if (others.length !== 2) {
      res[targetName] = new Set();
      return;
    }

    const [pA, pB] = others;

    const setForTarget = new Set<string>();

    attributes.forEach((attr) => {
      const qty = parseInt(attr.quantity || "0");
      if (qty <= 0) return;

      if (!matchesParam(attr, pA.parameter, pA.attribute)) return;
      if (!matchesParam(attr, pB.parameter, pB.attribute)) return;

      if (attr.attribute_main === targetName && attr.value_main)
        setForTarget.add(attr.value_main);
      else if (attr.attribute_secondary === targetName && attr.value_secondary)
        setForTarget.add(attr.value_secondary);
      else if (attr.attribute_tertiary === targetName && attr.value_tertiary)
        setForTarget.add(attr.value_tertiary);
    });

    res[targetName] = setForTarget;
  });

  return res;
};
