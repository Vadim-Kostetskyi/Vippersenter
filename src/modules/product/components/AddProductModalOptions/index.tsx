import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import slugify from "slugify";
import {
  useAddProductMutation,
  useUploadImageMutation,
} from "storeRedux/productsApi";
import styles from "./index.module.scss";

interface Variant {
  combination: { [key: string]: string };
  price: string;
  quantity: string;
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
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [newProduct, setNewProduct] = useState(false);
  const [popularProduct, setPopularProduct] = useState(false);

  const [attributeNames, setAttributeNames] = useState<string[]>([]);
  const [attributeValues, setAttributeValues] = useState<{
    [key: string]: string[];
  }>({});
  const [selectedCombination, setSelectedCombination] = useState<{
    [key: string]: string;
  }>({});
  const [variants, setVariants] = useState<Variant[]>([]);

  const [addProduct] = useAddProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const addAttributeName = () => {
    if (
      attributeNames.length > 0 &&
      attributeNames[attributeNames.length - 1].trim() === ""
    )
      return;
    setAttributeNames((prev) => [...prev, ""]);
  };

  const updateAttributeName = (index: number, name: string) => {
    const updated = [...attributeNames];
    updated[index] = name;
    setAttributeNames(updated);
  };

  const removeAttributeName = (index: number) => {
    const nameToRemove = attributeNames[index];
    const newAttrs = attributeNames.filter((_, i) => i !== index);
    const newValues = { ...attributeValues };
    delete newValues[nameToRemove];
    setAttributeNames(newAttrs);
    setAttributeValues(newValues);
    setSelectedCombination((prev) => {
      const updated = { ...prev };
      delete updated[nameToRemove];
      return updated;
    });
  };

  const addAttributeValue = (attrName: string) => {
    const values = attributeValues[attrName] || [];
    if (values.length > 0 && values[values.length - 1].trim() === "") return;
    setAttributeValues((prev) => ({
      ...prev,
      [attrName]: [...values, ""],
    }));
  };

  const updateAttributeValue = (
    attrName: string,
    index: number,
    value: string
  ) => {
    setAttributeValues((prev) => {
      const updatedValues = [...(prev[attrName] || [])];
      updatedValues[index] = value;
      return {
        ...prev,
        [attrName]: updatedValues,
      };
    });
  };

  const removeAttributeValue = (attrName: string, index: number) => {
    setAttributeValues((prev) => {
      const updated = { ...prev };
      updated[attrName] = updated[attrName].filter((_, i) => i !== index);
      return updated;
    });
    setSelectedCombination((prev) => {
      if (
        prev[attrName] &&
        attributeValues[attrName][index] === prev[attrName]
      ) {
        const updated = { ...prev };
        delete updated[attrName];
        return updated;
      }
      return prev;
    });
  };

  const toggleValueSelection = (attrName: string, value: string) => {
    setSelectedCombination((prev) => {
      const updated = { ...prev };
      updated[attrName] = value;
      return updated;
    });
  };

  useEffect(() => {
    const allSelected = attributeNames.every((attr) =>
      selectedCombination[attr]?.trim()
    );
    if (!allSelected) return;

    const comboKey = JSON.stringify(selectedCombination);

    setVariants((prev) => {
      const existsIndex = prev.findIndex(
        (v) => JSON.stringify(v.combination) === comboKey
      );
      if (existsIndex !== -1) return prev;

      return [
        ...prev,
        {
          combination: { ...selectedCombination },
          price: "0",
          quantity: "0",
        },
      ];
    });
  }, [selectedCombination, attributeNames]);

  const updateVariant = (field: "price" | "quantity", value: string) => {
    const comboKey = JSON.stringify(selectedCombination);
    setVariants((prev) => {
      const updated = prev.map((v) =>
        JSON.stringify(v.combination) === comboKey
          ? { ...v, [field]: value }
          : v
      );
      return updated;
    });
  };

  const getCurrentVariant = (): Variant | undefined => {
    const comboKey = JSON.stringify(selectedCombination);
    return variants.find((v) => JSON.stringify(v.combination) === comboKey);
  };

  const cartesianProduct = (arrays: string[][]): string[][] => {
    return arrays.reduce(
      (acc, curr) =>
        acc
          .map((x) => curr.map((y) => x.concat([y])))
          .reduce((a, b) => a.concat(b), []),
      [[]] as string[][]
    );
  }
  

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCategory === t("category")) {
      alert("Select a category");
      return;
    } else if (!selectedImage) {
      alert("Select an image");
      return;
    }    

    const keys = attributeNames;
    const valuesArrays = keys.map((key) => attributeValues[key] || []);

    const allCombinations = cartesianProduct(valuesArrays);

    const allVariants = allCombinations.map((comboValues) => {
      const combination: { [key: string]: string } = {};
      keys.forEach((key, idx) => {
        combination[key] = comboValues[idx];
      });

      const found = variants.find(
        (v) => JSON.stringify(v.combination) === JSON.stringify(combination)
      );

      return {
        combination,
        price: found?.price || "0",
        quantity: found?.quantity || "0",
      };
    });

    const imageForm = new FormData();
    imageForm.append("action", "uploadImage");
    if (selectedImage) imageForm.append("image", selectedImage);
    const uploaded = selectedImage
      ? await uploadImage(imageForm).unwrap()
      : { imageUrl: "" };

    const formData = new FormData();
    formData.append("action", "createProduct");
    formData.append("name", name);
    formData.append("slug", slugify(name));
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("imageUrl", uploaded.imageUrl);
    formData.append("category", selectedCategory);
    formData.append("newProduct", newProduct.toString());
    formData.append("popularProduct", popularProduct.toString());
    formData.append("description", description);
    formData.append(
      "attributes",
      JSON.stringify({
        attributeNames,
        attributeValues,
        variants: allVariants,
      })
    );

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    try {
      await addProduct(formData).unwrap();
      alert("Product successfully added!");
      onModalClose();
    } catch (err) {
      console.error("Error:", err);
      alert("Error adding a product.");
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Назва товару"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Ціна"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Кількість"
        required
      />

      {attributeNames.map((attr, i) => (
        <div key={i}>
          <input
            value={attr}
            onChange={(e) => updateAttributeName(i, e.target.value)}
            placeholder="Назва параметра"
          />
          <button type="button" onClick={() => removeAttributeName(i)}>
            ❌
          </button>

          {(attributeValues[attr] || []).map((val, j) => (
            <div key={j}>
              <input
                value={val}
                onChange={(e) => updateAttributeValue(attr, j, e.target.value)}
                placeholder="Значення"
              />
              <button
                type="button"
                onClick={() => removeAttributeValue(attr, j)}
              >
                ❌
              </button>
            </div>
          ))}

          <button type="button" onClick={() => addAttributeValue(attr)}>
            + Значення
          </button>
        </div>
      ))}

      <button type="button" onClick={addAttributeName}>
        + Параметр
      </button>

      <div>
        {attributeNames.map((attrName) => (
          <div key={attrName}>
            <strong>{attrName}</strong>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {(attributeValues[attrName] || []).map((val) => (
                <button
                  key={val}
                  type="button"
                  style={{
                    backgroundColor:
                      selectedCombination[attrName] === val ? "#ccc" : "#eee",
                  }}
                  onClick={() => toggleValueSelection(attrName, val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {attributeNames.every((attr) => selectedCombination[attr]?.trim()) && (
        <div>
          <div>
            <strong>Комбінація:</strong>{" "}
            {attributeNames
              .map((k) => `${k}: ${selectedCombination[k]}`)
              .join(" | ")}
          </div>
          <input
            type="text"
            placeholder="Додаткова ціна"
            value={getCurrentVariant()?.price || ""}
            onChange={(e) => updateVariant("price", e.target.value)}
          />
          <input
            type="text"
            placeholder="Кількість"
            value={getCurrentVariant()?.quantity || ""}
            onChange={(e) => updateVariant("quantity", e.target.value)}
          />
        </div>
      )}

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Опис"
      />

      <label>
        <input
          type="checkbox"
          checked={newProduct}
          onChange={(e) => setNewProduct(e.target.checked)}
        />{" "}
        Новинка
      </label>
      <label>
        <input
          type="checkbox"
          checked={popularProduct}
          onChange={(e) => setPopularProduct(e.target.checked)}
        />{" "}
        Популярне
      </label>

      <button type="submit">Зберегти</button>
    </form>
  );
};

export default AddProductModalOptions;
