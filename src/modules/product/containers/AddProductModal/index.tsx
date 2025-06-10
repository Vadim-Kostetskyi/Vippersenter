import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import CategoryNames from "components/CategoryNames";
import Dropdown from "components/Dropdown";
import AddProductModalOptions from "modules/product/components/AddProductModalOptions";
import UploadImage from "components/UploadImage";
import Cross from "assets/svg/Cross";
import styles from "./index.module.scss";

import image from "assets/image/img_3912-scaled.webp";

interface AddProductModalProps {
  onModalClose: () => void;
}

const AddProductModal: FC<AddProductModalProps> = ({ onModalClose }) => {
  const { t } = useTranslation();
  const { list } = CategoryNames(t);
  const [selectedCategory, setSelectedCategory] = useState(t("category"));
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleChangeImage = (img: File) => {
    setUploadImage(img);
    setImagePreview(URL.createObjectURL(img));
  };

  const onSetTitle = (item: string) => {
    setSelectedCategory(item);
  };

  return (
    <div className={styles.addProductModal}>
      <div className={styles.wrapper}>
        <button className={styles.closeBtn} onClick={onModalClose}>
          <Cross />
        </button>
        <Dropdown
          title={selectedCategory}
          list={list}
          onSetTitle={onSetTitle}
        />
        <UploadImage
          className={styles.imageContainer}
          image={imagePreview}
          handleChangeImage={handleChangeImage}
        />
        <AddProductModalOptions
          onModalClose={onModalClose}
          selectedCategory={selectedCategory}
          selectedImage={uploadImage}
        />
      </div>
    </div>
  );
};

export default AddProductModal;
