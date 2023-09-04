import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-tier',
  templateUrl: './customer-tier.component.html',
  styleUrls: ['./customer-tier.component.css']
})
export class CustomerTierComponent implements OnInit {

  @Input()
  tier: number = 0;

  @Input()
  points: number = 0;

  tierLogo: string = '';

  bronze: string = '../../../../assets/bronze.png';
  silver: string = '../../../../assets/silver.png';
  gold: string = '../../../../assets/gold.png';
  platinum: string = '../../../../assets/platinum.png';

  constructor() { }

  ngOnInit(): void {
    switch(this.tier) {
      case 0:
        this.tierLogo = this.bronze;
        break;
      case 1: 
        this.tierLogo = this.silver;
        break;
      case 2:
        this.tierLogo = this.gold;
        break;
      case 3:
        this.tierLogo = this.platinum;
        break;
      default:
        this.tierLogo = this.bronze;
        break;
    }
  }

}
