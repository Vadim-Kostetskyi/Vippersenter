export type PaymentMethod = "bank_card" | "vipps";

export interface CartAttributes {
  parameter: string;
  attribute: string;
  attribute_main?: string;
  value_main?: string;
  attribute_secondary?: string;
  value_secondary?: string;
  attribute_tertiary?: string;
  value_tertiary?: string;
  quantity?: number;
  [key: string]: any;
}

export interface CartItem {
  slug: string;
  price: number;
  quantity: number;
  attributes?: CartAttributes[];
  availableQuantity?: number;
  hasChanged?: boolean;
}
