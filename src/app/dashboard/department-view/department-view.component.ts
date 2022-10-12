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
  key: string = "";
  jd_data?: JobDescription;
  displayData: data[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private db: JdDataService) {
      this.displayData  = displayData;
      this.key = history.state.key
      // load data from DB
      console.log(this.key)
      this.db.getItem(this.key).subscribe((data) => {
        console.log("data", data);
        // and populate text fields
        this.form.setValue(data.hiring_manager_data)
        this.jd_data = data;
      })
    }

  ngOnInit(): void {
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
    console.log(this.displayData[this.getStepperIndex()].formName)
    this.stepper?.next();
  }

  back(): void {
    this.stepper?.back();
  }

  save(): void {
    console.log('save')
    console.log(this.form.value)
    this.db.getList().update(this.key, {
      stage: "in_edit_by_department",
      hiring_manager_data: this.form.value
    })
    this.router.navigate(['/home/dashboard'])
  }

  submitToHr(): void {
    // end editing and set status of JD to next field
    console.log(this.form.value)
    this.db.getList().update(this.key, {
      stage: "completed_by_department",
      hiring_manager_data: this.form.value,
    })
    this.router.navigate(['/home/dashboard'])
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
    title: "Woran arbeite ich?",
    text: "Reflektiere und beschreibe an dieser Stelle so präzise wie möglich, an welchen Aufgaben und Projekten gearbeitet wird. Dies ist entscheidend für Bewerbende, um nachvollziehen zu können, wie ihre Arbeit auf die Ziele der Behörde einzahlt.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Deine Aufgaben",
    formName: "what_you_work_on",
    hints: [
      " An welche Themen, Projekte, werden die Bewerbenden arbeiten?",
      " Beschreibe die Aufgaben und Arbeitsinhalte mit Beispielen",
      " Beschreibe die Rolle",
      " Beschreibe kurz, wie ein typischer Tag oder eine Woche aussehen könnte?"]
  },
  { // 1
    title: "Was muss ich können?",
    text: "Bewerbende möchten wissen, welche Qualifikationen sie mitbringen müssen und welche Fähigkeiten darüber hinaus für diese Stelle hilfreich wären. Reflektiere, was wirklich wichtig für diese Stelle ist, wie die Qualifikationen und Fähigkeiten auf das Tätigkeitsziel der Position einzahlen und beschreibe dies in wenigen Sätzen.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Das bringst du mit",
    formName: "what_you_bring",
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
    text: "Beschreibe für diesen Absatz, mit welchen Rollen und Persönlichkeiten die Bewerbenden zusammenarbeiten und in Kontakt kommen. Besonders die Teamstruktur und Vorgesetzte können ausschlaggebend für eine Bewerbung sein.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Dein Team",
    formName: "team",
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
    text: "Die Art der Zusammenarbeit im Team ist für Bewerbende sehr wichtig. Zeige auf, wie ihr arbeitet und welche Management- und Projektmethoden bei euch eine wichtige Rolle spielen.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Unser Arbeit",
    formName: "how_we_work",
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
    text: "Formuliere in wenigen Sätzen, wie die Bewerbenden in ihrer zukünftigen Position einen Mehrwert für ihr Referat bieten.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Die Stelle im Referat",
    formName: "impact_in_work",
    hints: []
  },
  { // 5
    title: "Wie stelle ich mich vor?",
    text: "Bewerbenden möchten aus einem kurzen und prägnanten Titel herauslesen können, was ihr Aufgabe ist. An dieser Stelle nicht von Dienst-Rollen wie Referent:in, Sachbearbeiter:in, etc. sprechen. Bitte nicht mit behördlichen Funktionsbezeichungen arbeiten",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Jobtitel",
    formName: "title"
  },
  { // 6
    title: "Kurze Zusammenfassung?",
    text: "Formuliere einen Satz, der es Interessierten ermöglicht zu verstehen, worum es bei der Stelle geht und woran gearbeitet werden soll.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Zusammenfassung",
    formName: "summary"
  },
]
