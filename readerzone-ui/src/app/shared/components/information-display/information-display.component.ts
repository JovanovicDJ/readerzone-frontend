import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information-display',
  templateUrl: './information-display.component.html',
  styleUrls: ['./information-display.component.css']
})
export class InformationDisplayComponent implements OnInit {

  show: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
