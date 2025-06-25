export interface Values {
  attributeName: string;
  extraPrice: string;
  quantity?: number;
}

export interface Attribute {
  name: string;
  values: Values[];
}

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
