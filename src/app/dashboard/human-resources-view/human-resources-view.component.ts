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
    title: "Woran arbeite ich?",
    text: "An welchen Aufgaben und Projekten arbeite ich? Wie zahle ich mit meiner Arbeit auf die Ziele der Behörde ein?",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Deine Aufgaben",
    formName: "what_you_work_on",
    hints: [
      " An welche Themen, Projekte, werden die Bewerber:innen arbeiten?",
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
    hints: [
      "An dieser Stelle nicht von Dienst-Rollen wie Referent:in, Sachbearbeiter:in, etc. sprechen.",
      "Nicht mit behördlichen Funktionsbezeichungen arbeiten",
      "Beispiele:",
      "Koordinatorin / Koordinator (w/m/d) im IT-Betrieb",
      "Team Lead Software Entwicklung (w/m/d)",
      "Data Scientist (w/m/d) im IT-Betrieb",
      "Fullstack Developer (w/m/d)",
      "Back End Developer (w/m/d)",
      "Datenbank Administratorin / Administrator (w/m/d)",
    ]
  },
  { // 6
    title: "Kurze Zusammenfassung?",
    text: "Formuliere einen Satz, der es Interessierten ermöglicht zu verstehen, worum es bei der Stelle geht und woran gearbeitet werden soll.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Zusammenfassung",
    formName: "summary",
    hints: [
      "Im Nationalen IT-Lagezentrum unterstützen Sie den 24/7 Dauerdienst und entwickeln Strukturen und Prozesse, um die Einsatzbereitschaft jederzeit sicherzustellen.",
      "Sie bilden die zentrale Eingangsschnittstelle für interne und externe Anfragen zur Bundescloud.",
    ]
  },
  { // 7
    title: "Was bietet ihr?",
    text: "Welche Benefits bietet ihr als Behörde? Welche Besonderheiten bietet ihr über die Rahmenbedingungen des öffentlichen Dienstes hinaus?",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Benefits",
    formName: "benefits",
    hints: [
      "Verschaffe den Bewerber:innen mithilfe von konkreten Beispielen einen nachvollziehbaren Einblick.",
    ]
  },
  { // 8
    title: "Wie geht es weiter?",
    text: "Wann erhalte ich Rückmeldung? Und wie lange dauert der Prozess? Ich habe noch andere Bewerbungen offen.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Zusammenfassung",
    formName: "process",
    hints: [
      "Wann erhält die Bewerber:in Rückmeldung?",
      "Wann finden die Auswahlgespräche statt?",
      "Wieviele Runden gibt es?",
      "Mit wem finden die Gespräche statt?"
    ]
  },
  { // 9
    title: "Und sonst?",
    text: "Bewerber:innen möchten übersichtlich die wichtigsten Informationen sehen. Daher füge die rechtlichen Informationen, wie zum Beispiel das Gleichstellungsgesetz als Link ein und halte dich kurz.",
    imageUrl: "assets/person.jpg",
    textareaLabel: "Rechtliches",
    formName: "legal",
    hints: [

    ]
  },
]
