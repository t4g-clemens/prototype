import { Component } from '@angular/core';
import { SECTIONDATA } from './sections-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prototype';
  sectionData = SECTIONDATA
}
