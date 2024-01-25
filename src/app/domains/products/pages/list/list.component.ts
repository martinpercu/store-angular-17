import { Component, signal, inject, Input, SimpleChanges } from '@angular/core';
// import { ProductComponent } from './../../components/product/product.component';
import { ProductComponent } from '@products/components/product/product.component';

import { RouterLinkWithHref } from '@angular/router'

import { Product } from '@shared/models/product.model'
import { Category } from '@shared/models/category.model'

import { HeaderComponent } from '@shared/components/header/header.component'

import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';

// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  // cart = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;


  // constructor() {
  //   const initialProducts: Product[] = [
  //     {
  //       id: Date.now(),
  //       title: 'Product N°1',
  //       price: 450,
  //       images: 'https://picsum.photos/500/500?r=14',
  //       createAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Product N°2',
  //       price: 320,
  //       images: 'https://picsum.photos/500/500?r=11',
  //       createAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Product N°3',
  //       price: 420,
  //       images: 'https://picsum.photos/500/500?r=19',
  //       createAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Product N°4',
  //       price: 456,
  //       images: 'https://picsum.photos/500/500?r=4',
  //       createAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Product N°5',
  //       price: 360,
  //       images: 'https://picsum.photos/500/500?r=1',
  //       createAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Product N°6',
  //       price: 620,
  //       images: 'https://picsum.photos/500/500?r=9',
  //       createAt: new Date().toISOString()
  //     },
  //   ];
  //   this.products.set(initialProducts);

  // }


  // listenFromChild(event: string) {
  //   console.log('we are in the parent');
  //   console.log(event);
  // }

  ngOnInit() {
    // this.getProductsList();
    this.getAllCategoriesList();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   const category_id = changes['category_id'];
  //   if (category_id) {
  //     this.getProductsList()
  //   }
  // }

  ngOnChanges(changes: SimpleChanges) {
    this.getProductsList()
  }


  addToCart(product: Product) {
    // this.cart.update(previousState => [...previousState, product]);
    // product.quantity = 1;  ===> I left the quentity = 1 directly in the cart service.
    this.cartService.addToCart(product);
  }

  private getProductsList() {
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) => {
        this.products.set(products)
      },
      error: () => {
        console.log('just after ngOnInit error trying to connect API');
      }
    });
  }

  private getAllCategoriesList() {
    this.categoryService.getAllCategories()
    .subscribe({
      next: (categories) => {
        this.categories.set(categories)
      },
      error: () => {
        console.log('just after ngOnInit error trying to connect API');
      }
    });
  }


}
