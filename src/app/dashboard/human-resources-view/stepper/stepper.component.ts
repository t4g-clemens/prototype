import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper-HR',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponentHR implements OnInit {

  index: number = 0;
  steps = 6;

  constructor() { }

  ngOnInit(): void {
  }

  next(): void {
    this.index += 1;
    console.log('next')
  }

  back(): void {
    this.index -= 1;
  }

  getIndex(): number {
    return this.index
  }
}
