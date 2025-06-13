import { ChangeEvent, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import {
  useAddProductMutation,
  useUploadImageMutation,
} from "storeRedux/productsApi";

interface Attribute {
  name: string;
  values: string[];
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
  const [description, setDescription] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState(false);
  const [popularProduct, setPopularProduct] = useState(false);

  const [addProduct] = useAddProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const { t } = useTranslation();

  const addAttribute = () => {
    setAttributes((prev) => [...prev, { name: "", values: [""] }]);
  };

  const updateAttributeName = (index: number, newName: string) => {
    setAttributes((prev) => {
      const newAttrs = [...prev];
      newAttrs[index].name = newName;
      return newAttrs;
    });
  };

  const addValue = (attrIndex: number) => {
    setAttributes((prev) => {
      const newAttrs = [...prev];
      if (
        newAttrs[attrIndex].values[newAttrs[attrIndex].values.length - 1] !== ""
      ) {
        newAttrs[attrIndex].values.push("");
      }
      return newAttrs;
    });
  };

  const updateValue = (
    attrIndex: number,
    valueIndex: number,
    newValue: string
  ) => {
    setAttributes((prev) => {
      const newAttrs = [...prev];
      newAttrs[attrIndex].values[valueIndex] = newValue;
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
        newValues.push("");
      }

      attr.values = newValues;
      newAttrs[attrIndex] = attr;

      return newAttrs;
    });
  };

  const removeAttribute = (index: number) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  const onSetDescription = (value: string) => {
    setDescription((prev) => [...prev, value]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedCategory === t("category")) {
      alert("Please select an category first");
      return;
    } else if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    formData.append("image", selectedImage);

    const uploadImageResult = await uploadImage(formData).unwrap();

    const productData = {
      image: uploadImageResult.imageUrl.replace(/^\/api\/v1/, ""),
      name,
      price: Number(price),
      quantity: Number(quantity),
      category: selectedCategory,
      newProduct,
      popularProduct,
      attributes: attributes
        .filter((a) => a.name.trim() !== "")
        .map((a) => ({
          name: a.name,
          values: a.values.filter((v) => v.trim() !== ""),
        })),
      description,
    };

    try {
      await addProduct(productData).unwrap();
      alert("Товар успішно додано!");
    } catch (err) {
      console.error("Error adding a product", err);
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
          min={0}
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
                  placeholder={t("form.value")}
                  value={val}
                  onChange={(e) => updateValue(i, idx, e.target.value)}
                  required
                  style={{ flexGrow: 1 }}
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
