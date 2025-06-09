import { useTranslation } from "react-i18next";
import React from "react";
import styles from "./index.module.scss";

type Product = {
  name: string;
  price: number;
  quantity: number;
  category: string; // Додаємо поле категорії
  description: string[];
  attributes?: {
    lines?: string[];
    curl?: string[];
    length?: string[];
    thickness?: string[];
  };
};

const products: Product[] = [
  {
    name: "Смартфон XYZ",
    price: 799,
    quantity: 15,
    category: "Техніка",
    description: ["sdfsdf"],
  },
  {
    name: "Ноутбук ABC",
    price: 1200,
    quantity: 0,
    category: "Техніка",
    description: ["sdfsfdfsd"],
  },
  {
    name: "Вії Lovely Premium",
    price: 250,
    quantity: 30,
    category: "Вії",
    description: [
      "Палетка-органайзер EFFECT – кращий вибір для майстрів-професіоналів. Коробка-органайзер організує ваш робочий простір, планшет легко дістається з коробки одним рухом, що економить ваш час. В упаковці 28 ліній вій для досконалих ефектів.",

      "—Вії виконані з еластичного волокна преміум якості. Волокно має насичений колір та чудову пігментацію від початку до кінця. Вії не мають небажаних зеленуватих та синюватих відтінків.",
      "—Волокно звужується з ⅔ своєї довжини, повторюючи структуру натуральних вій.",
      "—Усі вії в стрічках однакової довжини та товщини. Рівні кінчики не мають заломів.",
      "—Характеристики вказані на стрічці забезпечують комфорт в роботі та порядок на робочому місці.",
      "—Світло-жовта стрічка має високий ступінь липкості для легкого та швидкого формування пучків.",
    ],
    attributes: {
      lines: ["20 ліній", "28 ліній"],
      curl: ["B", "C", "CC", "D", "L", "L SOFT", "LC", "M"],
      length: [
        "5mm",
        "6mm",
        "7mm",
        "8mm",
        "9mm",
        "10mm",
        "11mm",
        "12mm",
        "13mm",
        "14mm",
        "4-7mm",
        "6-13mm",
      ],
      thickness: ["0.07", "0.1"],
    },
  },
];

const ProductsTable = () => {
  const { t } = useTranslation();

  // Групування товарів по категоріях
  const grouped = products.reduce<Record<string, Product[]>>((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <table border={1} cellPadding={8} className={styles.productsTable}>
      <thead>
        <tr>
          <th>{t("product.title")}</th>
          <th>{t("product.price")}</th>
          <th>{t("product.quantity")}</th>
          <th>Характеристики</th>
          <th>опис</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(grouped).map(([category, items]) => (
          <React.Fragment key={category}>
            <tr>
              <td
                colSpan={5}
                style={{ fontWeight: "bold", backgroundColor: "#eee" }}
              >
                {category}
              </td>
            </tr>
            {items.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  {product.price}
                </td>
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  {product.quantity}
                </td>
                <td>
                  {product.attributes ? (
                    <div>
                      {product.attributes.lines && (
                        <div>
                          <strong>Лінії:</strong>{" "}
                          {product.attributes.lines.join(", ")}
                        </div>
                      )}
                      {product.attributes.curl && (
                        <div>
                          <strong>Вигин:</strong>{" "}
                          {product.attributes.curl.join(", ")}
                        </div>
                      )}
                      {product.attributes.length && (
                        <div>
                          <strong>Довжина:</strong>{" "}
                          {product.attributes.length.join(", ")}
                        </div>
                      )}
                      {product.attributes.thickness && (
                        <div>
                          <strong>Товщина:</strong>{" "}
                          {product.attributes.thickness.join(", ")}
                        </div>
                      )}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {product.description.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
