type Attribute = {
  name: string;
  values: string[];
};

export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string[];
  attributes?: Attribute[];
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
