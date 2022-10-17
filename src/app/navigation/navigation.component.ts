import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserroleService, userRole } from '../services/userrole.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  _human_resources = userRole.human_resources;
  _department = userRole.departments;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
      this.auth.logout().subscribe( () => { this.router.navigate(['login']) } )
    }

  onRoleChange() {
    this.router.navigate(['home/dashboard'])
  }

  goDashboard() {
    this.router.navigate(['home/dashboard'])
  }

  getUserRole() {
    if (this.userRoleService.getUserRole() === userRole.departments) {
      return "Fachabteilung"
    }
    else {
      return "Personalabteilung"
    }
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthenticationService,
    private router: Router,
    public userRoleService: UserroleService) {}

}
