import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';


const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedIn = () => redirectLoggedInTo([''])


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    ...canActivate(redirectToLogin)},
  { path: 'login', component: LoginscreenComponent, ...canActivate(redirectLoggedIn)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
