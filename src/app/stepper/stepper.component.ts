import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  index: number = 0;
  // steps = [...Array(6).keys()];

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
