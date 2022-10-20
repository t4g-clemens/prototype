import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperComponent } from 'src/app/dashboard/department-view/stepper/stepper.component';
import { JobDescription } from 'src/app/interfaces/jobdescription';
import { JdDataService } from 'src/app/services/jd-data.service';
import { userRole, UserroleService } from 'src/app/services/userrole.service';
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
    private db: JdDataService,
    private activatedRoute: ActivatedRoute,
    private userRoleService: UserroleService) {
      this.displayData = displayData;
      if (this.activatedRoute.snapshot.queryParams["key"] !== undefined) {
        this.key = this.activatedRoute.snapshot.queryParams["key"];
      }
      this.userRoleService.role = userRole.departments;
      // load data from DB
      this.db.getItem(this.key).subscribe((data) => {
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

  next(): void {
    this.save();
    this.stepper?.next();
  }

  back(): void {
    this.save();
    this.stepper?.back();
  }

  save(): void {
    this.db.getList().update(this.key, {
      stage: "in_edit_by_department",
      hiring_manager_data: this.form.value
    })
  }

  submitToHr(): void {
    // end editing and set status of JD to next field
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
    title: "Woran werde ich arbeiten?",
    text: `"Dies ist für mich wichtig, um nachvollziehen zu können, wie meine Arbeit auf die Ziele der Behörde einzahlt."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: "Deine Aufgaben",
    formName: "what_you_work_on",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      "An welche Themen, Projekte, werden die Bewerbenden arbeiten?",
      "Beschreibe, wie sich die wichtigsten Aufgaben und Arbeitsinhalte für den Bewerbenden gestalten, am besten mithilfe kurzer Beispiele.",
      "Beschreibe die Rolle, die die Bewerbende einnehmen wird."]
  },
  { // 1
    title: "Was muss ich mitbringen?",
    text: `"Ich möchten wissen, welche Qualifikationen und Fähigkeiten ich mitbringen muss und wie diese
    auf das Tätigkeitsziel der Position einzahlen."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: "Das bringst du mit",
    formName: "what_you_bring",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      "Welche Abschlüsse sind gefordert?",
      "Wie werden die verlangten Fähigkeiten auf die Aufgaben und Arbeitsinhalten einzahlen?",
      "Welche anderen Fähigkeiten (Softskills), über den Abschluss hinaus, sind ebenfalls wichtig?",
      "Wie zahlen die Fähigkeiten auf die Ziele der Position ein?",
      "Was für Methoden oder Tools sollten die Bewerbende beherrschen?",
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
      "Gibts es ähnliche Positionen oder Rollen?",
      "Wie groß ist das Team?",
      "Wie ist die Altersstruktur?",
      "Wie ist die Geschlechterverteilung?",
      "Ist die Stelle eine neu geschaffene?",
      "Wächst das Team?",
    ]
  },
  { // 3
    title: "Wie arbeite ich?",
    text: `"Für mich ist die Art der Zusammenarbeit im Team wichtig. Besonderes ausschlaggebend sind für mich die Tools und die Arbeitsmethoden."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: "Unser Arbeit",
    formName: "how_we_work",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      "Beschreibe Eure Teamkultur und welche Werte euch wichtig sind?",
      "Wie werden Entscheidungen getroffen?",
      "Wie frei und eigenverantwortlich werden Bewerbende arbeiten können?",
      "Welche agilen Arbeitsmethoden werden eingesetzt?",
      "Beschreibe welche Formen des Arbeitsortes möglich sind und wie oft?",
    ]
  },
  { // 4
    title: "Worauf zahlt meine Arbeit ein?",
    text: `"Ich möchte wissen welchen Mehrwert ich mit meiner Arbeit für das Referat und die Gesellschaft leisten kann."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: "Die Stelle im Referat",
    formName: "impact_in_work",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      "Was ist die Aufgabe und das Ziel des Referats?",
      "Was ist die Aufgabe und das Ziel der Stelle in Hinblick auf die Aufgabe des Referats? ",
      "Was soll in dem ersten Jahr erreicht werden?",
    ]
  },
  { // 5
    title: "Was ist die Jobbezeichnung?",
    text: `"Ich möchte aus einem kurzen und prägnanten Titel, der sich an Jobtitel aus der Freien Wirtschaft orientiert, meine Stelle einfach finden können."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Jobtitel" in der Stellenausschreibung`,
    formName: "title",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      `"Koordinatorin / Koordinator (w/m/d) im IT-Betrieb"`,
      `"Team Lead Software Entwicklung (w/m/d)"`,
      `"Data Scientist (w/m/d) im IT-Betrieb"`,
      `"Fullstack Developer (w/m/d)"`,
      `"Back End Developer (w/m/d)"`,
      `"Datenbank Administratorin / Administrator (w/m/d)"`,
    ]
  },
  { // 6
    title: "Jobuntertitel",
    text: `"Ich möchte in einem Satz verstehen, worum es bei der Stelle geht und woran gearbeitet werden soll."`,
    imageUrl: "assets/person.jpg",
    textareaLabel: `"Jobuntertitel" in der Stellenausschreibung`,
    formName: "summary",
    hintTitle: "Daher möchte sie beispielsweise wissen",
    hints: [
      `"Im Nationalen IT-Lagezentrum unterstützen Sie den 24/7 Dauerdienst und entwickeln Strukturen und Prozesse, um die Einsatzbereitschaft jederzeit sicherzustellen."`,
      `"Sie bilden die zentrale Eingangsschnittstelle für interne und externe Anfragen zur Bundescloud."`,
    ]
  },
]
