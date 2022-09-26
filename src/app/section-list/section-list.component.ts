import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ConfigService, PartialTextInput } from '../config.service';
import { SectionComponent } from '../section/section.component';


@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {
  sections: any = []

  @ViewChildren(SectionComponent) viewSections!: QueryList<SectionComponent>;

  onSubmitButtonClick(): void {
    let data: PartialTextInput = {};
    for (let section of this.viewSections) {
      data[section.data.id as keyof PartialTextInput] = section.textInput;
      // console.log(section.textInput)
    }

    this.api.postTextInput(data).subscribe();
    console.log(data)
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
