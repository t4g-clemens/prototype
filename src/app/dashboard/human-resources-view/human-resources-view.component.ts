import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JdDataService } from 'src/app/services/jd-data.service';
import { JobDescription } from 'src/app/interfaces/jobdescription';
import { StepperComponentHR } from './stepper/stepper.component';
import { ContentComponent } from '../department-view/content/content.component';

@Component({
  selector: 'app-human-resources-view',
  templateUrl: './human-resources-view.component.html',
  styleUrls: ['./human-resources-view.component.css']
})
export class HumanResourcesViewComponent implements OnInit {
  @ViewChild('stepper') stepper?: StepperComponentHR
  @ViewChild('content') content?: ContentComponent

  form = this.formBuilder.group({
    who_we_are: [''],
    what_you_work_on: [''],
    what_you_bring: [''],
    team: [''],
    how_we_work: [''],
    what_you_get: [''],
    process: [''],
    legal: [''],
    disclaimer: [''],
    free_field: [''],
    title: [''],
    summary: [''],
    purpose: [''],
    benefits: [''],
  })
  jd_data?: JobDescription
  departmentData: string[] = [];
  key: string = ""
  displayData: data[] = [];
  charachtersCount: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private db: JdDataService,
  ) {
    this.displayData  = displayData;
    this.key = history.state.key;
    // load data from DB
    this.db.getItem(this.key).subscribe((data) => {
      console.log("data", data);
      // and populate text fields
      this.form.patchValue(data.hr_data)
      this.jd_data = data;
      this.extractDepartmentData();
    })
  }

  ngOnInit(): void {
  }

  extractDepartmentData() {
    if (this.jd_data !== undefined ) {
      this.departmentData = [
        this.jd_data.hiring_manager_data.what_you_work_on,
        this.jd_data.hiring_manager_data.what_you_bring,
        this.jd_data.hiring_manager_data.team,
        this.jd_data.hiring_manager_data.how_we_work,
        this.jd_data.hiring_manager_data.impact_in_work,
        this.jd_data.hiring_manager_data.title,
        this.jd_data.hiring_manager_data.summary,
      ]
    }
  }

  getDisplaydata(key: number) {
    return this.displayData[key]
  }

  getStepperIndex(): number {
    if ( this.stepper !== undefined ) {
      return this.stepper.index
    }
    else {
      return 0
    }
  }

  next(): void {
    this.stepper?.next();
  }

  back(): void {
    this.stepper?.back();
  }

  save(): void {
    // end editing and set status of JD to next field
    this.db.getList().update(this.key, {
      stage: "in_edit_by_hr",
      hr_data: this.form.value
    })
    this.router.navigate(['/home/dashboard'])
  }

  finish(): void {
    // end editing and set status of JD to finished
  this.db.getList().update(this.key, {
    stage: "finished",
    hr_data: this.form.value
  })
  this.router.navigate(['/home/dashboard'])
}
  preview(): void {
    this.db.getList().update(this.key, {
      stage: "in_edit_by_hr",
      hr_data: this.form.value
    })
    // this.router.navigate(['/preview'], {queryParams: {key: this.key}})
    window.open('/preview?key=' + this.key)
  }

  onValueChange(ev: string): void {
    this.charachtersCount = ev.length;
  }
}


interface data {
  title: string,
  text: string,
  imageUrl: string,
  textareaLabel: string,
  formName: string,
  hints?: string[]
}

let displayData = [
  { // 0
    title: "Woran werde ich arbeiten?",
    text: `"Dies ist für mich wichtig, um nachvollziehen zu können, wie meine Arbeit auf die Ziele der Behörde einzahlt."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Deine Aufgaben" in der Stellenausschreibung`,
    formName: "what_you_work_on",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."]
  },
  { // 1
    title: "Was muss ich mitbringen?",
    text: `"Ich möchten wissen, welche Qualifikationen und Fähigkeiten ich mitbringen muss und wie diese auf das Tätigkeitsziel der Position einzahlen."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Dein Profil" in der Stellenausschreibung`,
    formName: "what_you_bring",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."
    ]
  },
  { // 2
    title: "Mit wem werde ich arbeiten?",
    text: `"Mir ist es wichtig zu wissen mit welchen Rollen und Persönlichkeiten ich zusammenarbeiten und in Kontakt kommen werde. Besonders die Teamstruktur und meine Vorgesetzten sind ausschlaggebend."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Dein Team" in der Stellenausschreibung`,
    formName: "team",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."
    ]
  },
  { // 3
    title: "Wie werde ich arbeiten?",
    text: `"Für mich ist die Art der Zusammenarbeit im Team wichtig. Besonderes ausschlaggebend sind für mich die Tools und die Arbeitsmethoden."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Unser Arbeit" in der Stellenausschreibung`,
    formName: "how_we_work",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."
    ]
  },
  { // 4
    title: "Worauf zahlt meine Arbeit ein?",
    text: `"Ich möchte wissen welchen Mehrwert ich mit meiner Arbeit für das Referat und die Gesellschaft leisten kann."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Dein Purpose bei Uns" in der Stellenausschreibung`,
    formName: "impact_in_work",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."
    ]
  },
  { // 5
    title: "Solche Jobtitel verstehen sie.",
    text: `"Ich möchte aus einem kurzen und prägnanten Titel, der sich an Jobtiteln aus der Freien Wirtschaft orientiert, meine Stelle einfach finden können."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Jobtitel" in der Stellenausschreibung`,
    formName: "title",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."
    ]
  },
  { // 6
    title: "Jobuntertitel",
    text: `"Ich möchte in einem Satz verstehen, worum es bei der Stelle geht und woran gearbeitet werden soll."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Jobuntertitel" in der Stellenausschreibung`,
    formName: "summary",
    hints: [
      `"Im Nationalen IT-Lagezentrum unterstützen Sie den 24/7 Dauerdienst und entwickeln Strukturen und Prozesse, um die Einsatzbereitschaft jederzeit sicherzustellen."`,
      `"Sie bilden die zentrale Eingangsschnittstelle für interne und externe Anfragen zur Bundescloud."`,
    ]
  },
  { // 7
    title: "Was bietet ihr mir?",
    text: `"Ich möchte erkennen welche Benefits und Besonderheiten ihr mir über die Rahmenbedingungen des öffentlichen Dienstes bietet."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Benefits" in der Stellenausschreibung`,
    formName: "benefits",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen.",
    ]
  },
  { // 8
    title: "Wie sieht der Bewerbungsprozess aus?",
    text: `"Ich möchte wissen, wie der Bewerbungsprozess im öffentlichen Dienst aussieht. Zudem hilft mir eine klare Kommunikation im  Bewerbungsablaufs, um  Verständnis und Geduld zu haben."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Unser Prozess" in der Stellenausschreibung`,
    formName: "process",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen.",
    ]
  },
  { // 9
    title: "Was steht im Disclaimer?",
    text: `"Die Rahmenbedingungen der Stelle sind auch interessant für mich"`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Disclaimer" in der Stellenausschreibung`,
    formName: "legal",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."
    ]
  },
]
