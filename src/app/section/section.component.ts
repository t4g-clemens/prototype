import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';

export interface sectionData {
  id: string,
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

  @Input() data!: sectionData;

  textInput: string = "";

  constructor(public eventService: EventService) {
  }

  ngOnInit(): void {
  }

}
