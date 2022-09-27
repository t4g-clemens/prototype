import { Injectable } from '@angular/core';
import { SectionComponent } from './section/section.component';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  activeElement?: SectionComponent;

  setActive(elem: SectionComponent): void {
    this.activeElement = elem;
    console.log('activated ' + elem.id)
  }

  constructor() { }
}
