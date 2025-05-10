import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../shared/interfaces/cart.model';

export const addToCart = createAction(
  '[Product Page] Add To Cart',
  props<{ product: { id: number; name: string; price: number } }>()
);

export const removeFromCart = createAction(
  '[Cart Page] Remove Item',
  props<{ productId: number }>()
);

export const updateQuantity = createAction(
  '[Cart Page] Update Quantity',
  props<{ productId: number; quantity: number }>()
);

export const loadCart = createAction('[App] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart API] Load Success',
  props<{ items: CartItem[] }>()
);

export const loadCartFailure = createAction(
  '[Cart API] Load Failure',
  props<{ error: string }>()
); 