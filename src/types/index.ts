export interface BombasData {
  id: string;
  type: string;
  pump: string;
  status: string;
  code: string;
  price?: string;
}

export type CategoryType = "Conveniência" | "Automotivo";

export interface ProductItem {
  id: string;
  type: string;
  pump: string;
  status: string;
  code: string;
}

export interface CategoryConfig {
  dataKey: keyof typeof import("../constants/constants").PRODUCT_DATA;
  imageUrl: string;
}

export type ProductData = {
  [K in CategoryType]: ProductItem[];
};
