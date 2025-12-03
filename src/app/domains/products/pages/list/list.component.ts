import { Component, signal } from '@angular/core';
import { ProductComponent } from './../../components/product/product.component';

import { Product } from './../../../shared/models/product.model'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);

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
    ];
    this.products.set(initialProducts);
  }


  listenFromChild(event: string) {
    console.log('we are in the parent');
    console.log(event);



  }

}
