import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JdDataService } from 'src/app/services/jd-data.service';
import { JobDescription } from 'src/app/interfaces/jobdescription';
import { MatStepper } from '@angular/material/stepper';
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-human-resources-view',
  templateUrl: './human-resources-view.component.html',
  styleUrls: ['./human-resources-view.component.css']
})
export class HumanResourcesViewComponent implements OnInit {
  form = this.formBuilder.group({
    who_we_are: ['', Validators.required],
    what_you_work_on: ['', Validators.required],
    what_you_bring: ['', Validators.required],
    team: ['', Validators.required],
    how_we_work: ['', Validators.required],
    what_you_get: ['', Validators.required],
    process: ['', Validators.required],
    legal: ['', Validators.required],
    disclaimer: ['', Validators.required],
    free_field: ['', Validators.required],
    title: ['', Validators.required],
    summary: ['', Validators.required],
    purpose: ['', Validators.required],
    benefits: ['', Validators.required],
  })
  jd_data?: JobDescription
  @ViewChild('stepper') stepper?: MatStepper;
  key: string = ""

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private db: JdDataService,
  ) {
    this.key = history.state.key;
    // load data from DB
    this.db.getItem(this.key).subscribe((data) => {
      console.log("data", data);
      // and populate text fields
      this.form.patchValue(data.hr_data)
      this.jd_data = data;
    })
  }

  ngOnInit(): void {
  }

  hint_page(): boolean {
    let hr_indeces: Array<number> = [1, 2, 3, 5]
    if (this.stepper?.selectedIndex !== undefined) {
      if (hr_indeces.indexOf(this.stepper?.selectedIndex) > -1) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  // hint_page(): string {
  //   // hacky switch implementation, could be better
  //   let returnValue
  //   if (this.jd_data !== undefined) {
  //     if (this.stepper?.selectedIndex === 1) {
  //       // the "what you work on" page
  //       returnValue = this.jd_data.hiring_manager_data.what_you_work_on
  //     }
  //     if (this.stepper?.selectedIndex === 2) {
  //       // the "what you bring" page
  //       returnValue = this.jd_data.hiring_manager_data.what_you_bring
  //     }
  //     if (this.stepper?.selectedIndex === 3) {
  //       // the "team" page
  //       returnValue = this.jd_data.hiring_manager_data.team
  //     }
  //     if (this.stepper?.selectedIndex === 5) {
  //       // the "title" page
  //       returnValue = this.jd_data.hiring_manager_data.title
  //     }

  //   }
  //   if ( returnValue !== undefined ) {
  //     return returnValue
  //   }
  //   else {
  //     return ""
  //   }
  // }

  save(): void {
    // end editing and set status of JD to next field
    this.db.getList().update(this.key, {
      stage: "in_edit_by_hr",
      hr_data: this.form.value
    })
    this.router.navigate(['/home/dashboard'])
  }

  finish(): void {
    // end editing and set status of JD to finished
  this.db.getList().update(this.key, {
    stage: "finished",
    hr_data: this.form.value
  })
  this.router.navigate(['/home/dashboard'])
}
}
