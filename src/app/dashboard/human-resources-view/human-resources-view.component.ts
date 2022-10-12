import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  key: string = ""
  displayData: data[] = [];

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

  next(): void {
    console.log(this.displayData[this.getStepperIndex()].formName)
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
    window.open('/preview/?key=' + this.key)
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
    text: "Formuliere in wenigen Sätzen, wie die Bewerbenden in ihrer zukünftigen Position einen Mehrwert für ihr Referat bieten. Wie zahlen sie damit auf die einzelnen Ziele der Behörde ein?",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Dein Purpose bei Uns ",
    formName: "purpose"
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
  { // 7
    title: "Was bietet ihr?",
    text: "Welche Benefits bietet ihr als Behörde? Welche Besonderheiten bietet ihr über die Rahmenbedingungen des öffentlichen Dienstes hinaus? Verschaffe den Bewerbenden mithilfe von konkreten Beispielen einen nachvollziehbaren Einblick.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Benefits",
    formName: "benefits"
  },
  { // 8
    title: "Wie geht es weiter?",
    text: "Der Bewerbungsprozess im öffentlichen Dienst übersteigt die Dauer einer Bewerbung auf dem Arbeitsmarkt deutlich. Eine klare Kommunikation des Bewerbungsablaufs fördert Verständnis und Geduld beim Bewerbenden. Beschreibe, welchen Weg eine Bewerbung geht.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Zusammenfassung",
    formName: "process"
  },
  { // 9
    title: "Und sonst?",
    text: "Bewerbenden möchten übersichtlich die wichtigsten Informationen sehen. Daher füge die rechtlichen Informationen, wie zum Beispiel das Gleichstellungsgesetz als Link ein und halte dich kurz.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Rechtliches",
    formName: "legal"
  },
]
