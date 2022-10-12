import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StepperComponent } from 'src/app/stepper/stepper.component';
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

  displayData: data[] = [];

  constructor(private formBuilder: FormBuilder,) {
    this.displayData  = displayData;
    console.log(this.displayData);
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
  }

}

interface data {
  title: string,
  text: string,
  imageUrl: string,
  textareaLabel: string,
  formName: string,
}

let displayData = [
  { // 0
    title: "Woran arbeite ich?",
    text: "Reflektiere und beschreibe an dieser Stelle so präzise wie möglich, an welchen Aufgaben und Projekten gearbeitet wird. Dies ist entscheidend für Bewerbende, um nachvollziehen zu können, wie ihre Arbeit auf die Ziele der Behörde einzahlt.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Deine Aufgaben",
    formName: "what_you_work_on"
  },
  { // 1
    title: "Was muss ich können?",
    text: "Bewerbende möchten wissen, welche Qualifikationen sie mitbringen müssen und welche Fähigkeiten darüber hinaus für diese Stelle hilfreich wären. Reflektiere, was wirklich wichtig für diese Stelle ist, wie die Qualifikationen und Fähigkeiten auf das Tätigkeitsziel der Position einzahlen und beschreibe dies in wenigen Sätzen.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Das bringst du mit",
    formName: "what_you_bring"
  },
  { // 2
    title: "Mit wem arbeite ich?",
    text: "Beschreibe für diesen Absatz, mit welchen Rollen und Persönlichkeiten die Bewerbenden zusammenarbeiten und in Kontakt kommen. Besonders die Teamstruktur und Vorgesetzte können ausschlaggebend für eine Bewerbung sein.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Dein Team",
    formName: "team"
  },
  { // 3
    title: "Wie arbeite ich?",
    text: "Die Art der Zusammenarbeit im Team ist für Bewerbende sehr wichtig. Zeige auf, wie ihr arbeitet und welche Management- und Projektmethoden bei euch eine wichtige Rolle spielen.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Unser Arbeit",
    formName: "how_we_work"
  },
  { // 4
    title: "Warum ist das wichtig?",
    text: "Formuliere in wenigen Sätzen, wie die Bewerbenden in ihrer zukünftigen Position einen Mehrwert für ihr Referat bieten.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Unser Bewerbungsprozess",
    formName: "impact_in_work"
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
