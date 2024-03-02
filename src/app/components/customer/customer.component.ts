import { OnInit, Component } from '@angular/core';
import { CustomerResponse } from 'src/app/models/customer-response';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  display: boolean = false;
  displayMenu: boolean = true;
  displayMediumMenu: boolean = false;
  customers: CustomerResponse[] | undefined;

  constructor(private customerService: CustomerService) {}

  handleMenuDisplay(event: boolean): void {
    if (event) {
      this.displayMenu = !this.displayMenu;
    }
    else {
      this.displayMediumMenu = !this.displayMediumMenu;
    }
  }

  ngOnInit() {
    this.customerService.getAllCustomers()
      .subscribe({
        next: (customers) => {
          this.customers = customers;
          console.log(this.customers);
        },
        error: (e) => {
          console.log(e);
        }
      });
  }
}
