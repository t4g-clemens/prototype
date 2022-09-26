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

interface TextInput {
    job_titel: string,
    sub_title: string,
    who_we_are: string,
    tasks: string,
    requirements: string,
    team: string,
    work_culture: string,
    benefits: string,
    disclaimer: string
  }

export interface PartialTextInput extends Partial<TextInput> {};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config_url = 'http://localhost:8000/config';
  data_url = 'http://localhost:8000/'

  constructor(private http: HttpClient) { }

  getSections(): Observable<SectionList> {
    return this.http.get<SectionList>(this.config_url)
  }

  postTextInput(text_input: PartialTextInput): Observable<TextInput> {
    console.log("sending")
    return this.http.post<TextInput>(this.data_url, text_input)
  }
}
