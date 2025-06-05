export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  tags: string[];
}

export interface GetProductsResponse {
  products: Product[];
  pages?: number;
}
