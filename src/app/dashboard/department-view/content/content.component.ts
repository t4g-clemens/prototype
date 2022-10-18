import { Component, Input, OnInit } from '@angular/core';
import { AvatarService } from 'src/app/services/avatar.service';

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

  constructor(
    private avatarService: AvatarService
  ) {
    this.imageUrl = avatarService.getImage();
  }

  ngOnInit(): void {
  }
}
