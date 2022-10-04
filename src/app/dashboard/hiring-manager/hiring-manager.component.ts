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
    why: ['', Validators.required],
    what: ['', Validators.required],
    withWhom: ['', Validators.required],
    how: ['', Validators.required]
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
    this.db.getList().update(this.key, {hiring_manager_data: this.form.value})
    this.router.navigate(['/home/dashboard'])
  }

  submitToHr(): void {
    // end editing and set status of JD to next field
    console.log(this.form.value)
    this.db.getList().update(this.key, {
      hiring_manager_data: this.form.value,
      hiring_manager_input: true,
    })
    this.router.navigate(['/home/dashboard'])
  }

}
