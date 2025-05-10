import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem, CartState } from '../../shared/interfaces/cart.model';
import * as CartActions from '../../store/cart/cart.actions';
import * as CartSelectors from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // Selectors
  readonly cartItems$: Observable<CartItem[]>;
  readonly cartTotal$: Observable<number>;
  readonly cartLoading$: Observable<boolean>;

  constructor(private readonly store: Store<{ cart: CartState }>) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
    this.cartLoading$ = this.store.select(CartSelectors.selectCartLoading);
  }

  ngOnInit(): void {
    this.loadCart();
  }

  // Actions
  loadCart(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  removeItem(productId: number): void {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  updateItemQuantity(productId: number, quantity: number): void {
    this.store.dispatch(CartActions.updateQuantity({ productId, quantity }));
  }
} 