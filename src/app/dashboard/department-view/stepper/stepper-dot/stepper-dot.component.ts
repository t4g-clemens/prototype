import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper-dot',
  templateUrl: './stepper-dot.component.html',
  styleUrls: ['./stepper-dot.component.css']
})
export class StepperDotComponent implements OnInit {
  @Input() index: number = 0;
  @Input() activeStep?: number;

  constructor() { }

  ngOnInit(): void {
  }

  displayNumber() {
    return (this.index + 1)
  }
}
