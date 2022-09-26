import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ConfigService } from '../config.service';
import { SectionComponent } from '../section/section.component';



@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {
  sections: any = []

  @ViewChildren(SectionComponent) viewSections!: QueryList<SectionComponent>;

  onTextareaClick(): void {
    for (let section of this.viewSections) {
      console.log(section.textInput)
    }
    console.log('test')
  }

  getSections(): void {
    this.api.getSections()
      .subscribe(data => {
        this.sections = data.sections;
        console.log(this.sections);
      });
  }

  constructor(private api: ConfigService) { }

  ngOnInit(): void {
    this.getSections();
  }

}
