# Store Angular 17


## First steps.
- Start a the angular project.
- Install Tailwind.
- Organize with domain the structure. (products + info + about + shared... etc..)
- Add pages and component folders for each domain. As example ...===>
```sh
ng g c domains/products/pages/list
ng g c domains/products/components/product
```
- In app.routes.ts define path to the page/listComponent
- Reduce the app.component. ===> template = <router-outlet /> + delete CSS.

## Dual connection List Product
- Add @Input + @Output connection from List(Parent) to Product(Child). 

## Product Style
- Using Flowbite to inspiration to use tailwind. Use for product.component.html
- Add some gap in the list.component.html

## About Us
- New route for about us.
- Add a "remember lifecycle of component"
- For the about add an audio player with WaveSurfer js.

## Product model implementation
- New models folder in shared for the product ====> product.model.ts
- In List.component.ts import the Model Product
- In product.component.ts import the Model Product
- Add the list.HTML to show this new list of products

## Header component
- New header component in the shared folder
```sh
ng g c domains/shared/components/header
```
- Add full html witho all we need for this header. (I used Flowbite to help for this)
- This app-header will be everywhere we need it ===> example in list.component

## Cart Header
- Add the html Cart Header with a class translate-x-full to have it "hidden" from the viewport. 
- Now when not allow this "translate-x-full" the cart is showed.
- In header.ts ==> hideSideMenu = signal(true); then a method ==> toggleSideMenu()
- In header.html click in the cart button to activate this toogleSideMenu
- change the class to [class.translate-x-full]="hideSideMenu()" 

## Add product-to-cart
- In list component a new cart as a list of Products
- New method addToCart(). (similar to listenFromChild()) but receiving just a "Product"
- In list.html add this to the addTocart Button.
- In the product.ts in addToCartHandler the emit must to be the entired product.
- In header new @Input to receive the state of the cart.
- In list.component.HTML add the cart in the <app-header /> to <app-header [cart]="cart()"/>
- In header.html new counter to show products quantities.
- Make beaty the cart list ==> get from Flowbite
- In header.ts add method to return the total amount .... call this method in the HTML to show the total.
- IMPORTANT!! if we add a method directly in the HTML to be render IS NOT GOOD to practice. The only good practice to show a method if it is a SIGNAL. Otherwise we could get render issues.
- So we need to find a better way to show the total amount.... the solution could be getting the total amount each time we add a product.
- So We add ===> totalAmount = signal(0); Then using ngOnChanges add a logic to update the totalAmount using the method calcTotalAmount() before create and rendered in the HTML.
- Now in the HTML only render the totalAmount() because this is a SIGNAL. 

## Store for Cart
- New service for cart.
```sh
ng g s domains/shared/services/cart
```
- This will be the store with the info of the cart.
- Cart will be just a signal with the list of products inside
- Also this service has the addToCart() method.
- In header we import this cart service. We replace the old logic for the cart with the new cart service. (Anyway I left commented the old logic to see changes)


## API connection start
- New service to connect the API only for one product.
```sh
ng g s domains/shared/services/product
```
- In app.config import ==> import { provideHttpClient } from '@angular/common/http'. Also add this in the providers provideHttpClient().
- In list.component.ts inject the productService. Add logic in the ngOnInit to bring the products in the API.

## TSCONFIG Path
- In root in file tsconfig.json in the "compilerOptions" add "path". The path will allow to code @shared/ intead  the "./../../../shared" 
- We do the same for all domains in order to do clear code in the future.
- Replace of ./../../../ everywhere we want.

## Pipes for style
- I will add using pipes some improvement to html. uppercases, currency etc
- In product component.
- IMPORTANT. Now in Angular 17 we need to import from '@angular/common' or Each pipe like CurrencyPipe OR directly the CommonModule to get all Directives and Pipes from Angular. (https://angular.io/api/common/CommonModule).
- I will import only what I need.

## Custom Pipe
- New pipe to connect the API only for one product.
```sh
ng g p domains/shared/pipes/time-ago
```
- Install npm date functions. (great to manage dates)
```sh
npm i date-fns
```
- Add the logic to get a how much time from the creationAt of products.

## Directive template
- New directive
```sh
ng g d domains/shared/directives/highlight
```
- In the new highligth.directive I add some simple function
- In about.component I use this directive as "powerhighlight" in an span

## 404 - ERROR
- New component "not found"
```sh
ng g c domains/info/pages/not-found
```
- In app.routes.ts add logic for this.

## RouterLink
- In the 404 page when click on button that will RELOAD the main page. Not really good for UX..... Routerlink will help
- In not-found.ts ===> add "import { RouterLinkWithHref }  from '@angular/router';"
- Then in not-found.html replace href with routerlink.
- Now add the router link in the header to able go to "about","service" etc
- Also add the header to the about.

## Nested pages - Layout
- The header-nav bar is a common component in all site. So is time to prepare the site for nested pages.
- New component "not found"
```sh
ng g c domains/shared/components/layout
```
- In new layout component import { RouterOutlet } from '@angular/router';
- In new layout component import { HeaderComponent } from '@shared/components/header/header.component'
- The in app.routes.ts. add logic with children components in the layout.
- Then in each html component using the header just delete it. (I left them commented to see the changes).

## routerLinkActive
- The header show the same "underline" in Home and not change when go to "about". So with routerlinkActive we control the styles depends on routes where we are.
- In header.components.html add in all links "routerLinkActive="underline font-bold" This will add the style underline + font-fond.
- IMPORTANT ===> in the "/" link add also this==> "routerLinkActiveOptions]="{exact: true}"" This will make that only apply the stytes in the EXACT path.

## Product detail start
- Create new component for the product detail
```sh
ng g c domains/products/pages/product-detail
```
- In the new peoduct-detail.html add the html base structure for this component.
- In app.routes add the new page in the routes.
- IMPORTANT ===> add the id of the product in the path!!! ====> product/:id
- In product.component.html replace the href with the [routerLink]="['/product', product.id]"
- In product.component.ts import { RouterLinkWithHref } from '@angular/router'.
- With this we have the connexion to the new html

## Get product data
- In product.service. Add a method getOneProduct() to GET just one product. we will need just the product id to add in the request.
- In product-detail.ts import { ProductService } from '@shared/services/product.service'.
- In product-detail.ts add : private productService = inject(ProductService); to use the service.
- The important thing here is get the id from the "@Input() id?: string;" (the "?" after id is because as is a route the user could write directlly and take. We have no control about this. So this could be null)
- SUPER IMPORTANT to make this works in app.config in the provideRouter add the "withComponentInputBinding()".<br>
provideRouter(routes, withComponentInputBinding()),<br>
- This means for angular the parameters arrive as inputs.
- To check this in the product-detail.ts add an ngOnInit() to see this parameters "id" is arriving ok.
- If we get the product just create a product as signal ===> "product = signal<Product | null>(null);"
- In ngOnInit set this signal with info from API. ===> "this.product.set(product)".
- Now in product-detail.html using this data paint the component with product info. As example for the title ===> "{{ product()?.title }}"

## Image gallery
- To add a cool implementation to show the main picture this will be another signal ====> "mainPicture = signal<string| null>(null)". 
- Then create a method changeMainPicture() to set this signal to the new image. The click for this methods is in the little others images in product detail.
- Assign the mainPicture() in the [src] of the big image.
- To add the Category name create a new category model. Then Import this into product model. Then use "product()?.category?.name" in the product detail html.

## Product detail to Cart
- This is similar to the list product. 
- In product-detail.ts inject the cartService
- In product-detail.ts create method addProductToCart().... 
- IMPORTANT as the cartService addToCart() only accept a "product" in the mothod addProductToCart() we must create a const product = this.product().
- A little plus for html gallery + adding a dinamic class with conditional if the image is the same as the main image ===> "[class.border-blue-300]="image === mainPicture()"  

## Category Bar
- From the API we will get the category list.
- So create a service to manage the "categories".
```sh
ng g s domains/shared/services/category
```
- In the new file category.service add the injection dependency ====> "private http = inject(HttpClient)".
- Then add a method to get the categories. Will be something similar as the product.service. In this case will be getAllCategories().
- In products/pages/list.component (here is the list of product) HERE we will add the list of categories.
- In list.component.ts inject this new service ===> "private categoryService = inject(CategoryService)". Import Category from Models. Create new signal "categories". Create method in ngOnInit to get the categories.
- In list.component.html add a @for with the categories and puth category.name to show the name of each category. 

## URL params to categories
- Set using query params ===> category_id=x ===> x must show only products with x category.
- In list.component.ts import { RouterLinkWithHref } from '@angular/router'.
- In list.component.html add ===> "routerLink="/" [queryParams]="{category_id: category.id}"
- This params will arrives as an input. So In list.component.ts ===> @Input() category_id?: string. 
- Then to detect the category_id add a method in a ngOnChanges(). 
- OK. Now we have a system to detect the category choose by the user.
- One option could be "filter" the signal of products.
- Another option much better is use the API. (this way is what will be implmented.)
- First (to make much undestandable the code). In list.component.ts in the ngOnInit() the 2 methods take out and call this methods. ===> getProductsList() + getAllCategoriesList().
- Just to check only one change (each click on the categories buttons)===>  "ngOnChanges(changes: SimpleChanges)". Here with any change call the get getProductsList().
- In product.service in method getProducts() implement logic to add the category_id if exist to the query. ===> "getProducts(category_id?: string){}"
- In list.component.ts in "private getProductsList()" .... remember is the method that call the service to get the list of products. Here ====> "this.productService.getProducts(this.category_id)". Remember category_id could be undefined.
- With this must works fine everything.
- Important REMOVE the this.getProductsList() from the ngOnInit() because NOW we have the same in the ngOnChanges(). ngOnChanges run one we load the component and also each time detect any change.
- Important plus!!. Also we could avoid use the if (category_id) in the ngOnChanges() because if category_id exist or not is not a problem because in our method in product.service manage this. (I left commented the old ngOnChanges() to see the differences).

## LazyLoading split code
- Split the code first by routes.
- In app.routes replace the "component" with "loadComponent" ===> this is a dynamic import so the components will be call with "() => import(./domain etc etc).then(c => c.Component)".
- So for the ListComponents shoud be ==>: <br>
loadComponent: () => import ('./domains/products/pages/list/list.component').then(compo => compo.ListComponent)<br>
- With this Angular will create a chunk for the ListComponent
- Is possible avoid use the '.then()' in the app.routes if the component called change the "export class ListComponent" with "export default class ListComponent". I will do this in "about" and "product-detail" components. Also I left commented the non Lazyloading way.






















# StoreAngular17

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
