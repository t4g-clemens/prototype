import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { ListoverviewComponent } from './dashboard/listoverview/listoverview.component';
import { SectionListComponent } from './section-list/section-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewJobDescriptionComponent } from './dashboard/new-job-description/new-job-description.component';
import { HiringManagerComponent } from './dashboard/hiring-manager/hiring-manager.component';
import { HumanResourcesViewComponent } from './dashboard/human-resources-view/human-resources-view.component';


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
      path: 'hiringmanager',
      component: HiringManagerComponent,
      ...canActivate(redirectToLogin)
    },
    {
      path: 'newjobdescription',
      component: NewJobDescriptionComponent,
      ...canActivate(redirectToLogin)
    },
    {
      path: 'recruitment',
      component: HumanResourcesViewComponent,
      ...canActivate(redirectToLogin)
    },
  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
