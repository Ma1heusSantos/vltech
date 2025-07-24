import type { ProductItem, CategoryConfig, CategoryType } from "../types/index";

export const PRODUCT_DATA = {
  conveniencia: [
    {
      id: "1",
      type: "Coca-Cola",
      pump: "Refrigerante",
      status: "R$ 08,35",
      code: "023456",
    },
    {
      id: "2",
      type: "Pepsi",
      pump: "Refrigerante",
      status: "R$ 07,90",
      code: "023457",
    },
    {
      id: "3",
      type: "Guaraná Antarctica",
      pump: "Refrigerante",
      status: "R$ 06,50",
      code: "023458",
    },
    {
      id: "4",
      type: "Sprite",
      pump: "Refrigerante",
      status: "R$ 07,25",
      code: "023459",
    },
    {
      id: "5",
      type: "Fanta",
      pump: "Refrigerante",
      status: "R$ 07,15",
      code: "023460",
    },
    {
      id: "6",
      type: "Água Mineral",
      pump: "Bebida",
      status: "R$ 03,50",
      code: "023461",
    },
    {
      id: "7",
      type: "Suco Natural",
      pump: "Bebida",
      status: "R$ 12,90",
      code: "023462",
    },
    {
      id: "8",
      type: "Energético",
      pump: "Bebida",
      status: "R$ 15,50",
      code: "023463",
    },
    {
      id: "9",
      type: "Café Expresso",
      pump: "Bebida",
      status: "R$ 04,50",
      code: "023464",
    },
    {
      id: "10",
      type: "Chocolate",
      pump: "Doce",
      status: "R$ 08,90",
      code: "023465",
    },
  ] as ProductItem[],

  automotivo: [
    {
      id: "1",
      type: "Troca de Óleo",
      pump: "Manutenção",
      status: "R$ 150,00",
      code: "SRV001",
    },
    {
      id: "2",
      type: "Alinhamento",
      pump: "Manutenção",
      status: "R$ 80,00",
      code: "SRV002",
    },
    {
      id: "3",
      type: "Balanceamento",
      pump: "Manutenção",
      status: "R$ 60,00",
      code: "SRV003",
    },
    {
      id: "4",
      type: "Lavagem Simples",
      pump: "Lavagem",
      status: "R$ 50,00",
      code: "SRV004",
    },
    {
      id: "5",
      type: "Lavagem Completa",
      pump: "Lavagem",
      status: "R$ 120,00",
      code: "SRV005",
    },
    {
      id: "6",
      type: "Troca de Pneus",
      pump: "Manutenção",
      status: "R$ 200,00",
      code: "SRV006",
    },
    {
      id: "7",
      type: "Polimento",
      pump: "Estética",
      status: "R$ 250,00",
      code: "SRV007",
    },
    {
      id: "8",
      type: "Higienização Interna",
      pump: "Estética",
      status: "R$ 180,00",
      code: "SRV008",
    },
    {
      id: "9",
      type: "Troca de Filtro",
      pump: "Manutenção",
      status: "R$ 90,00",
      code: "SRV009",
    },
    {
      id: "10",
      type: "Diagnóstico Eletrônico",
      pump: "Manutenção",
      status: "R$ 100,00",
      code: "SRV010",
    },
  ] as ProductItem[],
} as const;

export const CATEGORY_CONFIG: Record<CategoryType, CategoryConfig> = {
  Conveniência: {
    dataKey: "conveniencia",
    imageUrl:
      "https://s1.kuantokusta.pt/img_upload/produtos_gastronomiavinhos/28413_3_coca-cola-refrigerante-com-gas-33cl.jpg",
  },
  Automotivo: {
    dataKey: "automotivo",
    imageUrl:
      "https://images.cws.digital/produtos/gg/10/29/oleo-de-motor-essencial-alta-rodagem-1-litro-1132910-1597958587057.jpg",
  },
} as const;

export const ANIMATION_CONSTANTS = {
  LOADING_DELAY: 300,
  CATEGORY_TRANSITION_DURATION: 200,
} as const;
