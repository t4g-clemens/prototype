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
  @Input() textareaLabel: string = "";
  @Input() formName: string = "";

  textfield: string = "..."
  imageUrl: string = "assets/persons/1.svg"

  constructor() {
    this.imageUrl = this.getRandomImage();
  }

  getRandomImage() {
    let i = Math.floor(Math.random() * 9) + 1;
    return `assets/persons/${i}.svg`
  }

  ngOnInit(): void {
  }
}
