import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JdDataService } from 'src/app/services/jd-data.service';
import { JobDescription } from 'src/app/interfaces/jobdescription';
import { MatStepper } from '@angular/material/stepper';

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
    what_you_get: ['', Validators.required],
    process: ['', Validators.required],
    legal: ['', Validators.required],
    disclaimer: ['', Validators.required],
    free_field: ['', Validators.required],
  })
  jd_data?: JobDescription
  currentStep: number = 0;
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
