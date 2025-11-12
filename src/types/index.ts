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

export interface Bico {
  numabast: number;
  codabast: number;
  codbico: number;
  encinicialabast: number;
  encerranteabast: number;
  volumeabast: number;
  valorabast: number;
  datahoraabast: string;
  precoabast: number;
  precoabastprazo: number;
  tridfunc: string;
  tridcliente: string;
  numterminal: number;
  codcaixa: number;
  codemp: number;
}
