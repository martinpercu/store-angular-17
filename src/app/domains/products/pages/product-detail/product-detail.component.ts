import { Component, Input, inject, signal } from '@angular/core';

import { ProductService } from '@shared/services/product.service'

import { CurrencyPipe, UpperCasePipe } from '@angular/common';


import { Product } from '@shared/models/product.model'
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Input() id?: string;
  product = signal<Product | null>(null);
  mainPicture = signal<string| null>(null);

  private productService = inject(ProductService);
  private cartService = inject(CartService)

  ngOnInit() {
    if(this.id) {
      this.productService.getOneProduct(this.id)
      .subscribe({
        next: (product) => {
          console.log(product);
          this.product.set(product)
          if (product.images.length > 0) {
            this.mainPicture.set(product.images[0]);
          }
        }
      })
    }
  }

  changeMainPicture(newImage: string) {
    this.mainPicture.set(newImage);
  }

  addProductToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }

}
