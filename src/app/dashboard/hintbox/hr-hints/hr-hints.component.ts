import { Component, Input, OnInit } from '@angular/core';
import { JobDescription } from 'src/app/interfaces/jobdescription';
import { JdDataService } from 'src/app/services/jd-data.service';

@Component({
  selector: 'app-hr-hints',
  templateUrl: './hr-hints.component.html',
  styleUrls: ['./hr-hints.component.css']
})
export class HrHintsComponent implements OnInit {
  @Input() stepperIndex: number = 0;
  @Input() key: string = "";

  jd_data?: JobDescription

  constructor(private db: JdDataService) {
    this.key = history.state.key
    // load data from DB
    console.log(this.key)
    this.db.getItem(this.key).subscribe((data) => {
      console.log("data", data);
      // and populate text fields
      this.jd_data = data;
    })
  }

  ngOnInit(): void {
  }

}
