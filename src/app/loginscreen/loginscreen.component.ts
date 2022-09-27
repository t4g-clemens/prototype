import { Component, OnInit, Input,Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.css']
})
export class LoginscreenComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Output() submitEM = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

}
