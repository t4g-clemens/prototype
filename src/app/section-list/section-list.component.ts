import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ConfigService } from '../config.service';
import { SectionComponent } from '../section/section.component';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {
  sections: any = []

  @ViewChildren(SectionComponent) viewSections!: QueryList<SectionComponent>;

  onSubmit(): void {
    let data: {[id: string]: string} = {};
    for (let section of this.viewSections) {
      data[section.id] = section.textInput
      console.log(section.textInput)
    }
    this.store.collection('sections').add(
      {
        timestamp: Date(),
        input: data
      })
  }

  onCancel(): void {
    // Delete all section data
  }

  getSections(): void {
    this.config.getSections()
      .subscribe(data => {
        this.sections = data.sections;
        console.log(this.sections);
      });
  }

  constructor(private config: ConfigService, private store: AngularFirestore) { }

  ngOnInit(): void {
    this.getSections();
  }

}
