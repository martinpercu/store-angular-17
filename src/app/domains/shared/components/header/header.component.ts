import { Component, signal, Input, SimpleChanges, inject } from '@angular/core';

import { Product } from '@shared/models/product.model'

import { CartService } from '@shared/services/cart.service';
import { RouterLinkWithHref, RouterLinkActive }  from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  // @Input({required: true}) cart: Product[] = [];
  // totalAmount = signal(0);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  totalAmount = this.cartService.totalAmount;
  totalItems = this.cartService.totalItems;


  toggleSideMenu() {
    this.hideSideMenu.update(previousState => !previousState)
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   const cart = changes['cart'];
  //   console.log('qsdfqsdf');

  //   if (cart) {
  //     this.totalAmount.set(this.calcTotalAmount())
  //   }
  // }

  // calcTotalAmount() {
  //   return this.cart.reduce((total, product) => total + product.price, 0)
  // }

}
