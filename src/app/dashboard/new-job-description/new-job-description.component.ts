import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JobDescription } from '../../interfaces/jobdescription';
import { JdDataService } from '../../services/jd-data.service';

@Component({
  selector: 'app-new-job-description',
  templateUrl: './new-job-description.component.html',
  styleUrls: ['./new-job-description.component.css']
})
export class NewJobDescriptionComponent implements OnInit {

  key: string = "";

  form: FormGroup = this.formBuilder.group({
    id: '',
    location: '',
    application_deadline: '',
    employment_type: '',
    start_date: '',
    education: '',
    website: '',
    compensation: '',
    notes: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private db: JdDataService
    ) {
      this.key = history.state.key
      // load data from DB
      this.db.getItem(this.key).subscribe((data) => {
        // and populate text fields
        this.form.patchValue({...data})
      })
    }

  ngOnInit(): void {
  }



  onCreate(): void {
    let jd: JobDescription = {
      ...this.form.value,
      stage: "new",
      hiring_manager_data: {
        why: "default values ...",
        what: "default values ...",
        withWhom: "default values ...",
        how: "default values ..."
      }
    }
    this.db.addItem(jd)
    this.form.reset()
    this.router.navigate(['/home/dashboard'])
  }

  onSave(): void {
    let jd: JobDescription = {
      ...this.form.value,
      stage: "new",
    }
    this.db.getList().update(this.key, jd)
    this.form.reset()
    this.router.navigate(['/home/dashboard'])
  }

  onSubmitToDepartment(): void {
    let jd: JobDescription = {
      ...this.form.value,
      stage: "send_to_department",
    }
    this.db.getList().update(this.key, jd)
    this.form.reset()
    this.router.navigate(['/home/dashboard'])
  }

  onClear(): void {
    this.form.reset()
    this.router.navigate(['/home/dashboard'])
  }
}
