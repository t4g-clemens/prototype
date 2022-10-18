import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JdDataService } from 'src/app/services/jd-data.service';
import { HiringManagerData, JobDescription } from 'src/app/interfaces/jobdescription';
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
    textareaLabel: "Deine Aufgaben",
    formName: "what_you_work_on",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."]
  },
  { // 1
    title: "Was muss ich mitbringen?",
    text: `"Welche Qualifikationen und Fähigkeiten muss ich mitbringen, damit ich in dieser Stelle erfolgreich bin? Und wie zahlen diese auf meine Aufgaben ein?"`,
    imageUrl: "assets/person.jpg",
    textareaLabel: "Das bringst du mit",
    formName: "what_you_bring",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."
    ]
  },
  { // 2
    title: "Mit wem werde ich arbeiten?",
    text: "Mit welchen Rollen und Persönlichkeiten arbeite ich zusammen? Die Teamstruktur und meine Vorgesetzten sind mir sehr wichtig.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Dein Team",
    formName: "team",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."
    ]
  },
  { // 3
    title: "Wie werde ich arbeiten?",
    text: `"Für mich ist die Art der Zusammenarbeit im Team wichtig. Besonderes ausschlaggebend sind für mich die Tools und die Arbeitsmethoden."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: "Unser Arbeit",
    formName: "how_we_work",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."
    ]
  },
  { // 4
    title: "Worauf zahlt meine Arbeit ein?",
    text: `"Ich möchte wissen welchen Mehrwert ich mit meiner Arbeit für das Referat und die Gesellschaft leisten kann."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: "Die Stelle im Referat",
    formName: "impact_in_work",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."
    ]
  },
  { // 5
    title: "Solche Jobtitel versteht sie.",
    text: `"Ich möchte aus einem kurzen und prägnanten Titel, der sich an Jobtitel aus der Freien Wirtschaft orientiert, meine Stelle einfach finden können."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: "Jobtitel",
    formName: "title",
    hints: [
      "An dieser Stelle nicht von Dienst-Rollen wie Referent:in, Sachbearbeiter:in, etc. sprechen.",
      "Nicht mit behördlichen Funktionsbezeichungen arbeiten",
      "Beispiele:",
      `"Koordinatorin / Koordinator (w/m/d) im IT-Betrieb"`,
      `"Team Lead Software Entwicklung (w/m/d)"`,
      `"Data Scientist (w/m/d) im IT-Betrieb"`,
      `"Fullstack Developer (w/m/d)"`,
      `"Back End Developer (w/m/d)"`,
      `"Datenbank Administratorin / Administrator (w/m/d)"`,
    ]
  },
  { // 6
    title: "Kurze Zusammenfassung?",
    text: `"Ich möchte in einem Satz verstehen, worum es bei der Stelle geht und woran gearbeitet werden soll."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: "Zusammenfassung",
    formName: "summary",
    hints: [
      `"Im Nationalen IT-Lagezentrum unterstützen Sie den 24/7 Dauerdienst und entwickeln Strukturen und Prozesse, um die Einsatzbereitschaft jederzeit sicherzustellen."`,
      `"Sie bilden die zentrale Eingangsschnittstelle für interne und externe Anfragen zur Bundescloud."`,
    ]
  },
  { // 7
    title: "Was bietet ihr?",
    text: `"Ich möchte erkennen welche Benefits und Besonderheiten ihr mir über die Rahmenbedingungen des öffentlichen Dienstes bietet."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: "Benefits",
    formName: "benefits",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen.",
    ]
  },
  { // 8
    title: "Wie geht es weiter?",
    text: "Wann erhalte ich Rückmeldung? Und wie lange dauert der Prozess? Ich habe noch andere Bewerbungen offen.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Zusammenfassung",
    formName: "process",
    hints: [
      "Wann erhalten die Bewerbenden Rückmeldung?",
      "Wann finden die Auswahlgespräche statt?",
      "Wieviele Runden gibt es?",
      "Mit wem finden die Gespräche statt?"
    ]
  },
  { // 9
    title: "Und sonst?",
    text: "Bewerbende möchten übersichtlich die wichtigsten Informationen sehen. Daher füge die rechtlichen Informationen, wie zum Beispiel das Gleichstellungsgesetz als Link ein und halte dich kurz.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Rechtliches",
    formName: "legal",
    hints: [
      "Hier folgen Beispiele aus erfolgreichen Ausschreibungen."
    ]
  },
]
