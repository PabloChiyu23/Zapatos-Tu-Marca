export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 'home' | 'shop';