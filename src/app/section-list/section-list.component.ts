import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ConfigService } from '../config.service';
import { SectionComponent } from '../section/section.component';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../event.service';
import { AuthenticationService } from '../services/authentication.service';

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
    this.auth.getUser().subscribe(
      (user) => {
        if ( user !== null ) {
        this.store.collection('sections').add(
          {
            username: user.email,
            timestamp: Date(),
            input: data
          });
        this.openSnackBar("Data saved ...")
      }
    }
    )
  }

  onCancel(): void {
    for (let section of this.viewSections) {
      section.textInput = ""
      console.log("deleted " + section.id)
    }
  }

  getSections(): void {
    this.config.getSections()
      .subscribe(data => {
        this.sections = data.sections;
        console.log(this.sections);
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  constructor(
    public eventService: EventService,
    private config: ConfigService,
    private store: AngularFirestore,
    private auth: AuthenticationService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getSections();
  }

}
