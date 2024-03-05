import { OnInit, Component } from '@angular/core';
import { CustomerResponse } from 'src/app/models/customer-response';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Router } from '@angular/router';

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

  constructor(
    private customerService: CustomerService,
    private router: Router) {}

  handleMenuDisplay(event: boolean): void {
    if (event) {
      this.displayMenu = !this.displayMenu;
    }
    else {
      this.displayMediumMenu = !this.displayMediumMenu;
    }
  }

  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.customerService.getAllCustomers()
      .subscribe({
        next: (customers) => {
          this.customers = customers;
          console.log(this.customers);
        },
        error: (e) => {
          console.log(e);
          if (e.error.statusCode === 401) {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            this.router.navigate(['login']);
          }
          else if (e.error.statusCode === 403) {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            this.router.navigate(['login']);
          }
        }
      });
  }
}
