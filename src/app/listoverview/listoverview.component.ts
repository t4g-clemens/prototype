import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { JdDataService } from '../services/jd-data.service';
import { JobDescription } from '../interfaces/jobdescription';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Component({
  selector: 'app-listoverview',
  templateUrl: './listoverview.component.html',
  styleUrls: ['./listoverview.component.css']
})
export class ListoverviewComponent implements OnInit {

  jds?: JobDescription[];

  constructor(public db: JdDataService ) {
  }

  ngOnInit(): void {
    this.getJobDescriptionList();
  }

  getJobDescriptionList(): void {
    this.db.getList().valueChanges()
      .subscribe(data => {
        this.jds = data;
      })
    }

  addNewJobDescription() {
    let jd: JobDescription = {
      id: "New ID",
      user: "test_user",
      created_at: Date(),
      hiring_manager: "hm_user"
    }
    this.db.addItem(jd)
  }
}
