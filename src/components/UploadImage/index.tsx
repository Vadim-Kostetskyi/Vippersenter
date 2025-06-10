import { FC } from "react";
import styles from "./index.module.scss";

interface UploadImageProps {
  image: string;
  className: string;
  handleChangeImage: (image: File) => void;
}

const UploadImage: FC<UploadImageProps> = ({
  image,
  className,
  handleChangeImage,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleChangeImage(e.target.files[0]);
    }
  };

  console.log(image);

  return (
    <div className={styles.uploadImage}>
      <div className={className}>
        {image ? <img src={image} alt="" className={styles.image} /> : null}
      </div>

      <input
        className={styles.uploadBtn}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};

export default UploadImage;
