import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { SectionListComponent } from './section-list/section-list.component';
import { SectionComponent } from './section/section.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginscreenComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
