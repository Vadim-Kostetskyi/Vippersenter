export type AttributeValue = {
  value_main: string;
  value_secondary?: string;
  value_tertiary?: string;
};

export type Attributes = {
  attribute_main: string;
  attribute_secondary?: string;
  attribute_tertiary?: string;
};

export type AttributesKey = keyof Attributes;
export type ValueKey = keyof AttributeValue;

export type Attribute = {
  extraPrice: string;
  quantity: string;
} & AttributeValue &
  Attributes;

export interface AttributeList {
  label: string;
  items: string[];
}

export interface Product {
  name: string;
  price: number;
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

export interface ServicePoint {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  city: string;
}

export interface PlaceOrderRequest {
  items: { productId: string; quantity: number }[];
  totalPrice: number;
}

export interface SelectedAttributes {
  parameter: string;
  attribute: string;
}

export interface CreatePaymentIntentRequest {
  amount: number;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}

/** ===== VIPPS TYPES ===== */

export type CreateVippsPaymentRequest = {
  orderId: string;
  amount: number; // в NOK (наприклад 499)
  description: string;
  returnUrl: string;
  customer?: {
    email?: string;
    phone?: string;
  };
  metadata?: Record<string, string>;
};

export type CreateVippsPaymentResponse = {
  redirectUrl: string;
  reference: string;
};

export type VippsPaymentStatusResponse = {
  reference: string;
  state:
    | "CREATED"
    | "AUTHORIZED"
    | "CAPTURED"
    | "CANCELLED"
    | "FAILED"
    | string;
};
