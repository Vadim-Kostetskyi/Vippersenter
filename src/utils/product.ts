import { TFunction } from "i18next";

export const handleDeleteProduct = async (
  id: string,
  deleteProduct: (id: string) => any,
  t: TFunction<"translation", undefined>
) => {
  if (window.confirm(`${t("product.confirmDelete")}?`)) {
    try {
      await deleteProduct(id).unwrap();
    } catch {
      alert(t("product.deleteError") || "Error deleting product");
    }
  }
};