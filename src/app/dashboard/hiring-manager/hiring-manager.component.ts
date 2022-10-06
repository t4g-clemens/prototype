import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobDescription } from 'src/app/interfaces/jobdescription';
import { JdDataService } from 'src/app/services/jd-data.service';

@Component({
  selector: 'app-hiring-manager',
  templateUrl: './hiring-manager.component.html',
  styleUrls: ['./hiring-manager.component.css']
})
export class HiringManagerComponent implements OnInit {

  form = this.formBuilder.group({
    what_you_work_on: ['', Validators.required],
    what_you_bring: ['', Validators.required],
    team: ['', Validators.required],
  })

  jd_data?: JobDescription
  key: string = ""

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private db: JdDataService,
    ) {
      this.key = history.state.key
      // load data from DB
      console.log(this.key)
      this.db.getItem(this.key).subscribe((data) => {
        console.log("data", data);
        // and populate text fields
        this.form.setValue(data.hiring_manager_data)
        this.jd_data = data;
      })
    }

    ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['/home/dashboard'])
  }

  save(): void {
    // end editing and set status of JD to next field
    console.log(this.form.value)
    this.db.getList().update(this.key, {
      stage: "in_edit_by_department",
      hiring_manager_data: this.form.value
    })
    this.router.navigate(['/home/dashboard'])
  }

  submitToHr(): void {
    // end editing and set status of JD to next field
    console.log(this.form.value)
    this.db.getList().update(this.key, {
      stage: "completed_by_department",
      hiring_manager_data: this.form.value,
    })
    this.router.navigate(['/home/dashboard'])
  }

}
