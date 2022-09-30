import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { ListoverviewComponent } from './listoverview/listoverview.component';
import { SectionListComponent } from './section-list/section-list.component';
import { NavigationComponent } from './navigation/navigation.component';


const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedIn = () => redirectLoggedInTo(['home'])


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full"},
  { path: 'login', component: LoginscreenComponent, ...canActivate(redirectLoggedIn)},
  { path: 'home', component: NavigationComponent, ...canActivate(redirectToLogin),
  children : [
    {
      path: 'dashboard',
      pathMatch: 'full',
      component: ListoverviewComponent,
      ...canActivate(redirectToLogin)
    },
    {
      path: 'sectionlist',
      component: SectionListComponent,
      ...canActivate(redirectToLogin)
    },
  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
