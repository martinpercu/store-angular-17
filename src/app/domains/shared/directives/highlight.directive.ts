import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[powerhighlight]',
  standalone: true
})
export class HighlightDirective {

  element = inject(ElementRef);

  constructor() { }

  ngOnInit() {
    this.element.nativeElement.setAttribute('style', 'color: white; background: red; font-size: 25px');
    // this.element.nativeElement.style.background = "yellow";
    // this.element.nativeElement.style.font-size = "yellow";
  }

}
