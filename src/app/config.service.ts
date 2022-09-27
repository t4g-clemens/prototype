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

export interface Examples {
  id: string[],
}

export interface ExampleList {
  examples: Examples
}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  section_url = '../assets/sections.json'
  example_url = '../assets/examples.json'

  constructor(private http: HttpClient) { }

  getSections(): Observable<SectionList> {
    return this.http.get<SectionList>(this.section_url)
  }

  getExamples(): Observable<ExampleList> {
    return this.http.get<ExampleList>(this.example_url)
  }
}
