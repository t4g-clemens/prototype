import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ListoverviewComponent } from './dashboard/listoverview/listoverview.component';
import { MatDividerModule } from '@angular/material/divider';
import { NewJobDescriptionComponent } from './dashboard/new-job-description/new-job-description.component';
import { HiringManagerComponent } from './dashboard/hiring-manager/hiring-manager.component';
import { HumanResourcesViewComponent } from './dashboard/human-resources-view/human-resources-view.component';
import { HintboxComponent } from './dashboard/hintbox/hintbox.component';
import { HrHintsComponent } from './dashboard/hintbox/hr-hints/hr-hints.component';
import { DepartmentHintsComponent } from './dashboard/hintbox/department-hints/department-hints.component';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { StepperComponent } from './dashboard/department-view/stepper/stepper.component';
import { StepperComponentHR } from './dashboard/human-resources-view/stepper/stepper.component';
import { StepperDotComponent } from './dashboard/department-view/stepper/stepper-dot/stepper-dot.component';
import { DepartmentViewComponent } from './dashboard/department-view/department-view.component';
import { ContentComponent } from './dashboard/department-view/content/content.component';
import { SplashcreensComponent } from './splashcreens/splashcreens.component';
import { SentscreenComponent } from './dashboard/department-view/sentscreen/sentscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginscreenComponent,
    ListoverviewComponent,
    NavigationComponent,
    NewJobDescriptionComponent,
    HiringManagerComponent,
    HumanResourcesViewComponent,
    HintboxComponent,
    HrHintsComponent,
    DepartmentHintsComponent,
    PreviewPageComponent,
    StepperComponent,
    StepperComponentHR,
    StepperDotComponent,
    DepartmentViewComponent,
    ContentComponent,
    SplashcreensComponent,
    SentscreenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    MatSnackBarModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatMenuModule,
    MatRadioModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 800}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
