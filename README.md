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
