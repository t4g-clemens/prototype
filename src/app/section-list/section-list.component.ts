import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SectionComponent } from '../section/section.component';
import { SECTIONDATA } from '../sections-data';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  sectionData = SECTIONDATA;

  @ViewChildren(SectionComponent) viewSections!: QueryList<SectionComponent>;

  onTextareaClick(): void {
    for (let section of this.viewSections) {
      console.log(section.textInput)
    }
    console.log('test')
  }

  constructor() { }

  ngOnInit(): void {
  }

}
