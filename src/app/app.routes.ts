import { Routes } from '@angular/router';

import { ListComponent } from '@products/pages/list/list.component';
// import { AboutComponent } from '@info/pages/about/about.component';
// import { NotFoundComponent } from '@info/pages/not-found/not-found.component';

import { LayoutComponent } from '@shared/components/layout/layout.component'

// import { ProductDetailComponent } from '@products/pages/product-detail/product-detail.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        // component: ListComponent
        loadComponent: () => import ('./domains/products/pages/list/list.component').then(compo => compo.ListComponent)
      },
      {
        path: 'about',
        // component: AboutComponent
        loadComponent: () => import ('./domains/info/pages/about/about.component')
      },
      {
        path: 'product/:id',
        // component: ProductDetailComponent
        loadComponent: () => import ('./domains/products/pages/product-detail/product-detail.component')
      }
    ]
  },
  {
    path: '**',
    // component: NotFoundComponent
    loadComponent: () => import ('./domains/info/pages/not-found/not-found.component')
  }
];
