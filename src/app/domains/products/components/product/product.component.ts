import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from './../../../shared/models/product.model'

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!: Product;

  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    console.log('clicking from the child');
    this.addToCart.emit('este produto goes to the cart ==> ' + this.product.title + "\n" + "this is the price ===> " + this.product.price);
  }

}
