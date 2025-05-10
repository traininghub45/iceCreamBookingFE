import { createReducer, on } from '@ngrx/store';
import { CartState, CartItem } from '../../shared/interfaces/cart.model';
import * as CartActions from './cart.actions';

const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state: CartState, { product }) => {
    const existingItem = state.items.find(item => item.productId === product.id);
    if (existingItem) {
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      return {
        ...state,
        items: [...state.items, {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }]
      };
    }
  }),
  on(CartActions.removeFromCart, (state: CartState, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.productId !== productId)
  })),
  on(CartActions.updateQuantity, (state: CartState, { productId, quantity }) => ({
    ...state,
    items: state.items.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    )
  })),
  on(CartActions.loadCart, (state: CartState) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CartActions.loadCartSuccess, (state: CartState, { items }) => ({
    ...state,
    items,
    loading: false
  })),
  on(CartActions.loadCartFailure, (state: CartState, { error }) => ({
    ...state,
    error,
    loading: false
  }))
); 