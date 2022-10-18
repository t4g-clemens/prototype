import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userRole, UserroleService } from '../services/userrole.service';

@Component({
  selector: 'app-splashcreens',
  templateUrl: './splashcreens.component.html',
  styleUrls: ['./splashcreens.component.css']
})
export class SplashcreensComponent implements OnInit {

  screen = 1;
  _human_resources = userRole.human_resources;
  _department = userRole.departments;

  constructor(
    private router: Router,
    public userRoleService: UserroleService
  ) { }

  ngOnInit(): void {
  }

  next() {
    this.screen += 1;
  }

  back() {
    this.screen -= 1;
  }

  login_as_department() {
    this.userRoleService.role = userRole.departments;
    this.router.navigate(['home/department'])
  }

  login_as_human_resources() {
    this.userRoleService.role = userRole.human_resources;
    this.router.navigate(['home/dashboard'])
  }
}
