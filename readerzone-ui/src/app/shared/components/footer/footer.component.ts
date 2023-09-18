import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  show: boolean = true;

  constructor() { }

  ngOnInit() {
    
  }

  hideFooter() {
    this.show = false;
  }

}
