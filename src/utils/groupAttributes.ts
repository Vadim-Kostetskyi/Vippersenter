export const groupAttributes = (
  attrs: {
    attribute_main: string;
    value_main: string;
    attribute_secondary?: string;
    value_secondary?: string;
    attribute_tertiary?: string;
    value_tertiary?: string;
  }[]
): { name: string; values: string[] }[] => {
  const grouped: { name: string; values: string[] }[] = [];

  attrs.forEach((attr) => {
    const entries = [
      { name: attr.attribute_main, value: attr.value_main },
      { name: attr.attribute_secondary, value: attr.value_secondary },
      { name: attr.attribute_tertiary, value: attr.value_tertiary },
    ];

    entries.forEach(({ name, value }) => {
      if (!name || !value) return;

      const existing = grouped.find((item) => item.name === name);
      if (existing) {
        if (!existing.values.includes(value)) {
          existing.values.push(value);
        }
      } else {
        grouped.push({ name, values: [value] });
      }
    });
  });

  return grouped;
};
