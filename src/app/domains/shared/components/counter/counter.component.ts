import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    // not ASYNC
    // Before render the component
    // Just one time
    console.log('this is contructor');
    console.log('---'.repeat(6));
  }

  ngOnChanges(changes: SimpleChanges) {
    // BEFORE and DURING ===> the render
    console.log('ngOnChanges');
    console.log('---'.repeat(6));
    console.log('this is changing ===>  ', changes);
    const durationNew = changes['duration'];
    console.log(durationNew);
    if (durationNew) {
      this.dosomething();
    }
    if (durationNew.currentValue !== durationNew.previousValue) {
      this.dosomething2();
    }

  }

  ngOnInit() {
    //AFTER render
    // Just one time
    // async, then, subscribes etc etc etc
    console.log('ngOnInit');
    console.log('---'.repeat(6));
    console.log('duration state ===>  ', this.duration);
    console.log('message state ===>  ', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval 1200');
      this.counter.update(statePrevious => statePrevious + 1)
    }, 1200)
  }

  ngAfterViewInit() {
    // after render
    // to know if Childs are rendered
    console.log('ngAfterViewInit');
    console.log('---'.repeat(6));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    window.clearInterval(this.counterRef);
  }

  dosomething() {
    console.log('Change only DURATION'); // go to ngOnchange ;)
  }
  dosomething2() {
    console.log('durationNew.currentValue !== durationNew.previousValue '); // go to ngOnchange ;)
  }

}
