import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() activeStep: number = 0;
  @Input() title: string = "this is a test";
  @Input() text: string = "";
  @Input() imageUrl: string = "";
  @Input() textareaLabel: string = "";
  @Input() formName: string = "";

  textfield: string = "..."

  constructor() { }

  ngOnInit(): void {
  }
}
