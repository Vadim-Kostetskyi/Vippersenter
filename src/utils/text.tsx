import { Fragment } from "react";

type Lang = "no" | "en";

const parseBlock = (text: string) => {
  return text.split("//").map((block, blockIndex) => {
    const words = block.trim().split(/\s+/).filter(Boolean);

    return (
      <p key={blockIndex}>
        {words.map((word, wordIndex) => {
          const isBold = word.startsWith("/");
          const content = isBold ? word.slice(1) : word;

          return (
            <Fragment key={wordIndex}>
              {isBold ? <strong>{content}</strong> : content}
              {wordIndex < words.length - 1 && " "}
            </Fragment>
          );
        })}
      </p>
    );
  });
};

export const parseDescription = (text: string, lang: Lang) => {
  if (!text) return null;

  const lines = text.replace(/\r/g, "").split("\n");

  let currentLang: Lang | null = null;
  const picked: string[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    // перемикачі мов
    if (line.startsWith("no/")) {
      currentLang = "no";
      const content = line.slice(3).trim();
      if (currentLang === lang && content) picked.push(content);
      continue;
    }

    if (line.startsWith("en/")) {
      currentLang = "en";
      const content = line.slice(3).trim();
      if (currentLang === lang && content) picked.push(content);
      continue;
    }

    // звичайний рядок: належить поточній мові
    if (currentLang === lang) {
      picked.push(line);
    }
  }

  if (picked.length === 0) return null;

  // з’єднуємо з перенесенням рядка,
  return <>{parseBlock(picked.join("\n"))}</>;
};
