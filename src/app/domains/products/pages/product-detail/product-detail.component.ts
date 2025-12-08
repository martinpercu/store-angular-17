import { Component, Input, inject, signal } from '@angular/core';

import { ProductService } from '@shared/services/product.service'

import { Product } from '@shared/models/product.model'

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Input() id?: string;
  product = signal<Product | null>(null);
  mainPicture = signal<string| null>(null);

  private productService = inject(ProductService);

  ngOnInit() {
    if(this.id) {
      this.productService.getOneProduct(this.id)
      .subscribe({
        next: (product) => {
          console.log(product);
          this.product.set(product)
          if (product.images) {
            this.mainPicture.set(product.images[0])
          }
        }
      })
    }
  }

  changeMainPicture(image: string) {
    this.mainPicture.set(image);
  }

}
