export const isExtraPrice = (str: string): boolean => {
  const trimmed = str.trim();

  if (/[\s,]/.test(trimmed)) return false;

  const parts = trimmed.split("_").filter(Boolean);

  return parts.length > 1;
};
