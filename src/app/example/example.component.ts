import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

class ExampleCard {
  title: string;
  body: string;

  constructor(title: string, body: string = "") {
    this.title = title;
    this.body = body;
  }
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  getExample(): ExampleCard {
    let exampleCard = new ExampleCard(
      this.eventService.activeElement + " (Beispiel)"
    )
    if (this.eventService.activeElement === "Daran arbeitest du") {
      exampleCard.body = "\"Für den operativen Einsatz beim kommenden G7 Gipfeltreffen in Schloss Elmau hat das BDOS eine Besondere Aufbauorganisation (BAO) für die Gewährleistung eines uneingeschränkten Digitalfunkbetriebs eingerichtet. Mit ca. 22.000 Einsatzkräften und über 18.000 registrierten Endgeräten wird es sich um eine der größten Einsatzlagen der vergangenen Jahre handeln. Wir brauchen dich, um über Statistische Analysen und Outlier Detections in Echtzeit Engpässe zu erkennen und so gezielt eingreifen zu können.\""
    }
    return exampleCard
  }

  constructor(public eventService: EventService) { }

  ngOnInit(): void {
  }

}
