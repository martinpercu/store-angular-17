import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  // imageSrc = 'https://picsum.photos/500/500?r=' + Math.random();
  @Input({required: true}) imageSrc: string = '';
  @Input({required: true}) price: number = 0;
  @Input({required: true}) title: string = '';

  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    console.log('clicking from the child');
    this.addToCart.emit('este produto goes to the cart ==> ' + this.title + "\n" + "this is the price ===> " + this.price);
  }

}
