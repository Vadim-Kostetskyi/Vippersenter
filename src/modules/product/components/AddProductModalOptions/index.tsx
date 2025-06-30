import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import slugify from "slugify";
import {
  useAddProductMutation,
  useUploadImageMutation,
} from "storeRedux/productsApi";
import styles from "./index.module.scss";

interface Values {
  attributeName: string;
  extraPrice: string;
  quantity?: number;
}

interface Attribute {
  name: string;
  price?: string;
  values: Values[];
}

interface AddProductModalOptionsProps {
  onModalClose: () => void;
  selectedCategory: string;
  selectedImage: File | null;
}

const AddProductModalOptions: FC<AddProductModalOptionsProps> = ({
  onModalClose,
  selectedCategory,
  selectedImage,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [description, setDescription] = useState<string>("");
  const [newProduct, setNewProduct] = useState(false);
  const [popularProduct, setPopularProduct] = useState(false);

  const [addProduct] = useAddProductMutation();

  const [uploadImage] = useUploadImageMutation();

  const { t } = useTranslation();

  const addValue = (attrIndex: number) => {
    setAttributes((prev) => {
      const newAttrs = [...prev];
      const values = newAttrs[attrIndex].values;
      const last = values[values.length - 1];

      if (!last || last.attributeName.trim() === "") {
        return newAttrs;
      }

      values.push({ attributeName: "", extraPrice: "", quantity: 0 });
      return newAttrs;
    });
  };

  const updateValueName = (
    attrIndex: number,
    valueIndex: number,
    newName: string
  ) => {
    setAttributes((prev) => {
      const newAttrs = [...prev];
      newAttrs[attrIndex].values[valueIndex].attributeName = newName;
      return newAttrs;
    });
  };

  const updateValuePrice = (
    attrIndex: number,
    valueIndex: number,
    newPrice: string
  ) => {
    setAttributes((prev) => {
      const newAttrs = [...prev];
      newAttrs[attrIndex].values[valueIndex].extraPrice = newPrice;
      return newAttrs;
    });
  };

  const updateValueQuantity = (
    attrIndex: number,
    valueIndex: number,
    newQuantity: string
  ) => {
    const parsed = parseInt(newQuantity);
    if (isNaN(parsed) || parsed < 0) return;

    setAttributes((prev) => {
      const newAttrs = [...prev];
      newAttrs[attrIndex].values[valueIndex].quantity = parsed;
      return newAttrs;
    });
  };

  const updateAttributeName = (attrIndex: number, newName: string) => {
    setAttributes((prev) => {
      const newAttrs = [...prev];
      newAttrs[attrIndex].name = newName;
      return newAttrs;
    });
  };

  const removeValue = (attrIndex: number, valueIndex: number) => {
    setAttributes((prev) => {
      const newAttrs = [...prev];
      const attr = { ...newAttrs[attrIndex] };
      const newValues = [...attr.values];

      newValues.splice(valueIndex, 1);
      if (newValues.length === 0) {
        newValues.push({ attributeName: "", extraPrice: "", quantity: 0 });
      }

      attr.values = newValues;
      newAttrs[attrIndex] = attr;

      return newAttrs;
    });
  };

  const addAttribute = () => {
    setAttributes((prev) => [
      ...prev,
      {
        name: "",
        price: "",
        values: [{ attributeName: "", extraPrice: "", quantity: 0 }],
      },
    ]);
  };

  const removeAttribute = (index: number) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  const onSetDescription = (value: string) => {
    setDescription(value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCategory === t("category")) {
      alert("Please select an category first");
      return;
    } else if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    const image = new FormData();
    image.append("action", "uploadImage");
    image.append("image", selectedImage);

    const uploadImageResult = await uploadImage(image).unwrap();

    const formData = new FormData();

    formData.append("action", "createProduct");
    formData.append("name", name);
    formData.append("slug", slugify(name));
    formData.append("price", price.toString());
    formData.append("quantity", quantity.toString());
    formData.append("imageUrl", uploadImageResult.imageUrl);
    formData.append("category", selectedCategory);
    formData.append("newProduct", newProduct.toString());
    formData.append("popularProduct", popularProduct.toString());
    formData.append("description", description);
    formData.append(
      "attributes",
      JSON.stringify(
        attributes
          .filter((attr) => attr.name.trim() !== "")
          .map((attr) => ({
            name: attr.name,
            values: attr.values
              .filter((v) => v.attributeName.trim() !== "")
              .map((v) => ({
                attributeName: v.attributeName,
                extraPrice: v.extraPrice,
                quantity: v.quantity,
              })),
          }))
      )
    );

    try {
      await addProduct(formData).unwrap();
      alert("Товар успішно додано!");
    } catch (err: any) {
      console.error("Error adding a product", err);

      if (err?.data) {
        console.error("Response data:", err.data);
      }

      alert("Помилка при додаванні товару. Подивись консоль.");
    }

    onModalClose();
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <label>
        <input
          type="text"
          value={name}
          placeholder={t("product.title")}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        <input
          type="number"
          step="0.01"
          value={price}
          min={0}
          placeholder={t("product.price")}
          onChange={(e) =>
            setPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          required
        />
      </label>

      <label>
        <input
          type="number"
          value={quantity}
          min={1}
          placeholder={t("product.quantity")}
          onChange={(e) =>
            setQuantity(e.target.value === "" ? "" : Number(e.target.value))
          }
          required
        />
      </label>

      <fieldset className={styles.fieldset}>
        <legend>{t("form.attributes")}:</legend>
        {attributes.map((attr, i) => (
          <div
            key={i}
            style={{ border: "1px solid #ccc", padding: 10, marginBottom: 15 }}
          >
            <input
              type="text"
              placeholder={t("form.attributeName")}
              value={attr.name}
              onChange={(e) => updateAttributeName(i, e.target.value)}
              required
              style={{ display: "block", marginBottom: 8, width: "100%" }}
            />

            {attr.values.map((val, idx) => (
              <div
                key={idx}
                style={{ display: "flex", gap: 8, marginBottom: 5 }}
              >
                <input
                  type="text"
                  placeholder="Значення"
                  value={val.attributeName}
                  onChange={(e) => updateValueName(i, idx, e.target.value)}
                  required
                  style={{ flexGrow: 1 }}
                />
                <input
                  type="text"
                  placeholder="Додаткова ціна"
                  value={val.extraPrice}
                  onChange={(e) => updateValuePrice(i, idx, e.target.value)}
                  style={{ flexGrow: 1 }}
                />
                <input
                  type="number"
                  min={0}
                  placeholder="Кількість"
                  value={val.quantity ?? ""}
                  onChange={(e) => updateValueQuantity(i, idx, e.target.value)}
                  style={{ width: 90 }}
                />
                <button type="button" onClick={() => removeValue(i, idx)}>
                  ❌
                </button>
              </div>
            ))}

            <button type="button" onClick={() => addValue(i)}>
              {t("form.addValue")}
            </button>
            <button
              type="button"
              onClick={() => removeAttribute(i)}
              style={{ marginLeft: 10, color: "red" }}
            >
              {t("form.deleteAttribute")}
            </button>
          </div>
        ))}

        <button type="button" onClick={addAttribute}>
          {t("form.addAttribute")}
        </button>
      </fieldset>

      <div className={styles.newSettings}>
        <label>
          <input
            type="checkbox"
            onChange={(e) => setPopularProduct(e.target.checked)}
          />
          Популярні товари
        </label>
        <label>
          <input
            type="checkbox"
            onChange={(e) => setNewProduct(e.target.checked)}
          />
          <span>Новинки</span>
        </label>
      </div>

      <label className={styles.description}>
        {t("form.description")}:
        <textarea
          value={description}
          onChange={(e) => onSetDescription(e.target.value)}
          rows={4}
        />
      </label>

      <button type="submit">{t("form.save")}</button>
    </form>
  );
};

export default AddProductModalOptions;
