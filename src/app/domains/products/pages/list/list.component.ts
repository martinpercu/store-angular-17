import { Component, signal, inject } from '@angular/core';
import { ProductComponent } from './../../components/product/product.component';

import { Product } from './../../../shared/models/product.model'
import { HeaderComponent } from './../../../shared/components/header/header.component'

import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  // cart = signal<Product[]>([]);

  private cartService = inject(CartService);

  constructor() {
    const initialProducts: Product[] = [
      {
        id: Date.now(),
        title: 'Product N°1',
        price: 450,
        image: 'https://picsum.photos/500/500?r=14',
        createAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Product N°2',
        price: 320,
        image: 'https://picsum.photos/500/500?r=11',
        createAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Product N°3',
        price: 420,
        image: 'https://picsum.photos/500/500?r=19',
        createAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Product N°4',
        price: 456,
        image: 'https://picsum.photos/500/500?r=4',
        createAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Product N°5',
        price: 360,
        image: 'https://picsum.photos/500/500?r=1',
        createAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Product N°6',
        price: 620,
        image: 'https://picsum.photos/500/500?r=9',
        createAt: new Date().toISOString()
      },
    ];
    this.products.set(initialProducts);

  }


  // listenFromChild(event: string) {
  //   console.log('we are in the parent');
  //   console.log(event);
  // }

  addToCart(product: Product) {
    // this.cart.update(previousState => [...previousState, product]);
    this.cartService.addToCart(product);
  }

}
