import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, CartItem } from '../../shared/interfaces/cart.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState): CartItem[] => state.items
);

export const selectCartTotal = createSelector(
  selectCartItems,
  (items: CartItem[]): number => items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0)
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (items: CartItem[]): number => items.reduce((count: number, item: CartItem) => count + item.quantity, 0)
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state: CartState): boolean => state.loading
); 