export type Attribute = {
  name: string;
  values: string[];
};

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  description: string[];
  attributes?: Attribute[];
  newProduct?: boolean;
  popularProduct?: boolean;
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
