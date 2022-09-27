import { Component, OnInit } from '@angular/core';
import { ConfigService, Examples } from '../config.service';
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
  examples_data?: Examples

  getExample(): ExampleCard {
    let activeElem = this.eventService.activeElement
    let exampleCard = new ExampleCard("Beispiel", "")
    if ( activeElem && this.examples_data){
      let example_list = this.examples_data[activeElem.id as keyof Examples];
      exampleCard.body =  example_list[0]
    }
    return exampleCard
  }

  constructor(public eventService: EventService, private config: ConfigService) {
    config.getExamples().subscribe(d => this.examples_data = d.examples)
  }

  ngOnInit(): void {
  }

}
