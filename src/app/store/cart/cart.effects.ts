import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../shared/interfaces/cart.model';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private cartService = inject(CartService);

  loadCart$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      mergeMap(() => 
        this.cartService.getCartItems().pipe(
          map((items: CartItem[]) => CartActions.loadCartSuccess({ items })),
          catchError((error: Error) => of(CartActions.loadCartFailure({ error: error.message })))
        )
      )
    )
  );
} 