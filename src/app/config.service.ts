import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Section {
  id: number,
  title: string,
  subtitle: string,
  isTextarea: boolean
}

interface SectionList {
  sections: Section[]
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // section_url = '../assets/sectiondata.json';
  section_url = 'http://localhost:8000/config';

  constructor(private http: HttpClient) { }

  getSections(): Observable<SectionList> {
    return this.http.get<SectionList>(this.section_url)
  }
}
