import { Injectable } from '@angular/core';
import { SectionComponent } from './section/section.component';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  activeElement?: string; // Switch to id or something like it

  setActive(elem: string): void {
    this.activeElement = elem;
    console.log('activated ' + elem)
  }

  constructor() { }
}
