import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-hints',
  templateUrl: './department-hints.component.html',
  styleUrls: ['./department-hints.component.css']
})
export class DepartmentHintsComponent implements OnInit {
  @Input() stepperIndex: number = 0;


  constructor() { }

  ngOnInit(): void {
  }

  hints(): string {
    return "test"
  }
}
