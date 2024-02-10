import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  display: boolean = false;
  displayMenu: boolean = true;
  displayMediumMenu: boolean = false;
  
  handleMenuDisplay(event: boolean): void {
    if (event) {
      this.displayMenu = !this.displayMenu;
    }
    else {
      this.displayMediumMenu = !this.displayMediumMenu;
    }
  }
}
