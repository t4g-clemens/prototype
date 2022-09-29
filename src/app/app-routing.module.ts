import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { ListoverviewComponent } from './listoverview/listoverview.component';


const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedIn = () => redirectLoggedInTo([''])


const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: ListoverviewComponent,
    ...canActivate(redirectToLogin)},
  { path: 'login', component: LoginscreenComponent, ...canActivate(redirectLoggedIn)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
