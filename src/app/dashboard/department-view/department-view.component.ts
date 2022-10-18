import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StepperComponent } from 'src/app/dashboard/department-view/stepper/stepper.component';
import { JobDescription } from 'src/app/interfaces/jobdescription';
import { JdDataService } from 'src/app/services/jd-data.service';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit {
  @ViewChild('stepper') stepper?: StepperComponent
  @ViewChild('content') content?: ContentComponent

  form = this.formBuilder.group({
    what_you_work_on: [''],
    what_you_bring: [''],
    team: [''],
    how_we_work: [''],
    title: [''],
    summary: [''],
    impact_in_work: [''],
  })
  key: string = "-NELgsmO9G9qcq06nQqV";
  jd_data?: JobDescription;
  displayData: data[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private db: JdDataService) {
      this.displayData = displayData;
      // load data from DB
      this.db.getItem(this.key).subscribe((data) => {
        console.log("data", data);
        // and populate text fields
        this.form.setValue(data.hiring_manager_data)
        this.jd_data = data;
      })
    }

  ngOnInit(): void {
  }

  getRandomImage() {

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

  _next(): void {
    this.stepper?.next();
  }

  back(): void {
    this.stepper?.back();
  }

  save(): void {
    this.db.getList().update(this.key, {
      stage: "in_edit_by_department",
      hiring_manager_data: this.form.value
    })
    this.router.navigate(['/home/dashboard'])
  }

  submitToHr(): void {
    // end editing and set status of JD to next field
    console.log('testse')
    this.db.getList().update(this.key, {
      stage: "completed_by_department",
      hiring_manager_data: this.form.value,
    })
    this.router.navigate(['/finished'])
  }
}

interface data {
  title: string,
  text: string,
  imageUrl: string,
  textareaLabel: string,
  formName: string,
  hintTitle: string,
  hints?: string[]
}

let displayData = [
  { // 0
    title: "Woran arbeite ich?",
    text: "An welchen Aufgaben und Projekten arbeite ich? Wie zahle ich mit meiner Arbeit auf die Ziele der Behörde ein?",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Deine Aufgaben",
    formName: "what_you_work_on",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      " An welche Themen, Projekte, werden die Bewerbenden arbeiten?",
      " Beschreibe die Aufgaben und Arbeitsinhalte mit Beispielen",
      " Beschreibe die Rolle",
      " Beschreibe kurz, wie ein typischer Tag oder eine Woche aussehen könnte?"]
  },
  { // 1
    title: "Was muss ich können?",
    text: "Welche Qualifikationen sind wichtig, damit ich in dieser Stelle erfolgreich bin? Wie zahlen diese Fähigkeiten auf meine Aufgaben ein?",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Das bringst du mit",
    formName: "what_you_bring",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      "Welche Abschlüsse sind gefordert?",
      "Beschreibe die Fähigkeiten passend zu den Aufgaben und Arbeitsinhalten",
      "Wie zahlen die Fähigkeiten auf die Ziele der Position ein?",
      "Was für Tools sollte die Bewerber:in beherrschen?",
      "Welche Softskills sind wichtig für das Team?",
    ]
  },
  { // 2
    title: "Mit wem arbeite ich?",
    text: "Mit welchen Rollen und Persönlichkeiten arbeite ich zusammen? Die Teamstruktur und meine Vorgesetzten sind mir sehr wichtig.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Dein Team",
    formName: "team",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      "Ist das Team interdisziplinär?",
      "Gibts es ähnliche Positionen?",
      "Wer ist noch im Team?",
      "Wie groß ist das Team?",
      "Wie ist die Altersstruktur?",
      "Wie ist die Geschlechterverteilung?",
      "Ist die Stelle eine neu geschaffen?",
      "Wächst das Team?",
    ]
  },
  { // 3
    title: "Wie arbeite ich?",
    text: "Wie ist die Zusammenarbeit im Team gestaltet? Welche Management- und Arbeitsmethoden kommen zur Anwendung?",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Unser Arbeit",
    formName: "how_we_work",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      "Welche agilen Arbeitsmethoden werden eingesetzt?",
      "Check-ins / Retros / Scrum / ...",
      "Beschreibe Eure Teamkultur und welche Werte euch wichtig sind?",
      "Fehlerkultur / Auf Augenhöhe Entscheidungen treffen / Kaffeerunden zum Start in den Morgen / ...",
      "Wie arbeitet ihr an den Aufgaben?",
      "In zeitlich begrenzten Projekten / Tickets / Multidisziplinären Teams / ...",
      "Wie frei und eigenverantwortlich wird der Bewerbende arbeiten können?",
      "Beschreibe welche Formen des Arbeitsortes möglich sind (Office / Remote) und wie oft",
      "Beschreibe diese, nur wenn sie wirklich gelebt werden",
    ]
  },
  { // 4
    title: "Warum ist das wichtig?",
    text: "Inwiefern kann ich in dieser Position einen Mehrwert für das Referat und die Gesellschaft leisten?",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Die Stelle im Referat",
    formName: "impact_in_work",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      "Welche Projekte verantwortet das Referat?",
      "Wie zahlt die Stelle in die Ziele des Referats ein?",
      "Wie zahlt die Stelle in die Ziele der Behörde ein?",
      "Was soll in den ersten sechs Monaten erreicht werden?",
    ]
  },
  { // 5
    title: "Wie stelle ich mich vor?",
    text: "Bewerbende möchten aus einem kurzen und prägnanten Titel herauslesen können, was ihr Aufgabe ist.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Jobtitel",
    formName: "title",
    hintTitle: "Daher möchte sie beispielsweise wissen",
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
    text: "Formuliere einen Satz, der es Interessierten ermöglicht zu verstehen, worum es bei der Stelle geht und woran gearbeitet werden soll.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Zusammenfassung",
    formName: "summary",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      `"Im Nationalen IT-Lagezentrum unterstützen Sie den 24/7 Dauerdienst und entwickeln Strukturen und Prozesse, um die Einsatzbereitschaft jederzeit sicherzustellen."`,
      `"Sie bilden die zentrale Eingangsschnittstelle für interne und externe Anfragen zur Bundescloud."`,
    ]
  },
]
