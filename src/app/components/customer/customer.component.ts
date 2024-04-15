import { OnInit, Component } from '@angular/core';
import { CustomerResponse } from 'src/app/models/customer-response';
import { IdResponse } from 'src/app/models/id-response';
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
  user_logged: CustomerResponse | undefined;
  customers: CustomerResponse[] | undefined;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {
    
  }

  handleMenuDisplay(event: boolean): void {
    if (event) {
      this.displayMenu = !this.displayMenu;
    }
    else {
      this.displayMediumMenu = !this.displayMediumMenu;
    }
  }

  ngOnInit() {
    let user_logged: string | null = localStorage.getItem('user_logged');
    if (user_logged) {
      this.user_logged = JSON.parse(user_logged);
    }
    else {
      let idResponse: IdResponse = JSON.parse(localStorage.getItem('id')!);
      this.customerService.getCustomer(idResponse.id!)
        .subscribe({
          next: (customer) => {
            this.user_logged = customer;
            localStorage.setItem('user_logged', JSON.stringify(customer));
          },
          error: (e) => {
            if (e.error.statusCode === 401) {
              localStorage.clear();
              this.router.navigate(['login']);
            }
            else if (e.error.statusCode === 403) {
              localStorage.clear();
              this.router.navigate(['login']);
            }      
          }
        });
    }
    this.customerService.getAllCustomers()
      .subscribe({
        next: (customers) => {
          this.customers = customers;
        },
        error: (e) => {
          if (e.error.statusCode === 401) {
            localStorage.clear();
            this.router.navigate(['login']);
          }
          else if (e.error.statusCode === 403) {
            localStorage.clear();
            this.router.navigate(['login']);
          }
        }
      });
  }

  handleLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
