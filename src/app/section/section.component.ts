import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';

export interface sectionData {
  title: string,
  subtitle: string,
  isTextarea: boolean
}

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() title: string = "";
  @Input() subtitle: string = "";

  @Input() isTextarea: boolean = true;

  textInput: string = "";

  constructor(public eventService: EventService) {
  }

  ngOnInit(): void {
  }

}
