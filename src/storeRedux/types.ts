export type Attribute = {
  attribute: string;
  extraPrice: string;
  quantity: string;
  value: string;
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
