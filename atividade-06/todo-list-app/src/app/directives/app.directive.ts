import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDirective]'
})
export class AppDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.fontWeight = 'bold';
  }

}
