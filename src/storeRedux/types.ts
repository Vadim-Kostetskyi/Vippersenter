export type Attribute = {
  attribute_main: string;
  value_main: string;
  attribute_secondary?: string;
  value_secondary?: string;
  attribute_tertiary?: string;
  value_tertiary?: string;
  extraPrice: string;
  quantity: string;
};

export interface Product {
  name: string;
  price: string;
  image: string;
  quantity: string;
  category: string;
  description: string;
  attributes?: Attribute[];
  newProduct?: string;
  popularProduct?: string;
  slug: string;
}

export interface GetProductsResponse {
  products: Product[];
  pages?: number;
}

export interface LoginResponse {
  token: string;
  userObj: {
    _id: string;
    email: string;
    __v: number;
  };
  message: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface User {}
