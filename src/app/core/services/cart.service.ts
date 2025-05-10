import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from '../../shared/interfaces/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private mockCartItems: CartItem[] = [
    {
      productId: 1,
      name: 'Vanilla Ice Cream',
      price: 4.99,
      quantity: 1
    },
    {
      productId: 2,
      name: 'Chocolate Ice Cream',
      price: 5.99,
      quantity: 1
    }
  ];

  getCartItems(): Observable<CartItem[]> {
    return of(this.mockCartItems);
  }

  addItem(product: { id: number; name: string; price: number }): Observable<CartItem[]> {
    const existingItem = this.mockCartItems.find(item => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.mockCartItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
    return of(this.mockCartItems);
  }

  removeItem(productId: number): Observable<CartItem[]> {
    this.mockCartItems = this.mockCartItems.filter(item => item.productId !== productId);
    return of(this.mockCartItems);
  }

  updateQuantity(productId: number, quantity: number): Observable<CartItem[]> {
    const item = this.mockCartItems.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
    return of(this.mockCartItems);
  }
} 