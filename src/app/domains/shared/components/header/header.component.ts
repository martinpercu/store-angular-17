import { Component, signal, Input, SimpleChanges } from '@angular/core';

import { Product } from './../../models/product.model'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  @Input({required: true}) cart: Product[] = [];
  totalAmount = signal(0);


  toggleSideMenu() {
    this.hideSideMenu.update(previousState => !previousState)
  }

  ngOnChanges(changes: SimpleChanges) {
    const cart = changes['cart'];
    console.log('qsdfqsdf');

    if (cart) {
      this.totalAmount.set(this.calcTotalAmount())
    }
  }

  calcTotalAmount() {
    return this.cart.reduce((total, product) => total + product.price, 0)
  }

}
