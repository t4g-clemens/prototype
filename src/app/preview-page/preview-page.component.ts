import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobDescription } from '../interfaces/jobdescription';
import { JdDataService } from '../services/jd-data.service';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.css']
})
export class PreviewPageComponent implements OnInit {

  jd_data?: JobDescription
  key: string = ""

  constructor(
    private db: JdDataService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.key = this.activatedRoute.snapshot.queryParams["key"];
    // load data from DB
    this.db.getItem(this.key).subscribe((data) => {
      console.log("data", data);
      // and populate text fields
      this.jd_data = data;
    })
  }

  ngOnInit(): void {
  }

}
