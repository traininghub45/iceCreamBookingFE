export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
} 