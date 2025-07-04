export const parseDescription = (text: string) => {
  // 1. Розділити за '//'
  const parts = text.split("//");

  return parts.map((part, index) => {
    // В кожному part обробити слова
    const words = part.trim().split(" ");

    const nodes = words.map((word, i) => {
      if (word.startsWith("/")) {
        // слово для жирного
        const cleanWord = word.slice(1);
        return (
          <strong key={i}>
            {cleanWord}
            {i < words.length - 1 ? " " : ""}
          </strong>
        );
      } else {
        // звичайне слово
        return word + (i < words.length - 1 ? " " : "");
      }
    });

    // Після кожного блоку, крім останнього, додати <br /> і пробіл
    return (
      <p key={index}>
        {nodes}
        {index < parts.length - 1 && (
          <>
            <br />{" "}
          </>
        )}
      </p>
    );
  });
};
