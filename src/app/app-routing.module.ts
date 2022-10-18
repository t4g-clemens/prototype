import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { ListoverviewComponent } from './dashboard/listoverview/listoverview.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewJobDescriptionComponent } from './dashboard/new-job-description/new-job-description.component';
import { HiringManagerComponent } from './dashboard/hiring-manager/hiring-manager.component';
import { HumanResourcesViewComponent } from './dashboard/human-resources-view/human-resources-view.component';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { StepperComponent } from './dashboard/department-view/stepper/stepper.component';
import { DepartmentViewComponent } from './dashboard/department-view/department-view.component';
import { SplashcreensComponent } from './splashcreens/splashcreens.component';
import { SentscreenComponent } from './dashboard/department-view/sentscreen/sentscreen.component';


const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedIn = () => redirectLoggedInTo(['home'])


const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: "full"},
  // { path: 'login', component: LoginscreenComponent, ...canActivate(redirectLoggedIn)},
  // { path: 'home', component: NavigationComponent, ...canActivate(redirectToLogin),
  { path: 'login', component: LoginscreenComponent},
  { path: 'splash', component: SplashcreensComponent},
  {
    path: 'preview',
    component: PreviewPageComponent,
    // ...canActivate(redirectToLogin)
  },
  {
    path: 'stepper',
    component: StepperComponent,
    // ...canActivate(redirectToLogin)
  },
  {
    path: 'finished',
    component: SentscreenComponent,
    // ...canActivate(redirectToLogin)
  },
  { path: 'home', component: NavigationComponent,
  children : [
    {
      path: 'dashboard',
      pathMatch: 'full',
      component: ListoverviewComponent,
      // ...canActivate(redirectToLogin)
    },
    {
      path: 'department',
      component: DepartmentViewComponent,
      // ...canActivate(redirectToLogin)
    },
    {
      path: 'recruitment',
      component: HumanResourcesViewComponent,
      // ...canActivate(redirectToLogin)
    },
    {
      path: 'newjobdescription',
      component: NewJobDescriptionComponent,
      // ...canActivate(redirectToLogin)
    },
  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
