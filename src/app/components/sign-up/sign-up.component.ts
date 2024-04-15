import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Router } from '@angular/router';
import { IdResponse } from 'src/app/models/id-response';
import { JoinRequest } from 'src/app/models/join-request';
import { labourLinks } from 'src/app/models/labour-link';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  failText: string = '';
  joinRequest: JoinRequest = {};
  options = labourLinks.map(
    (value: string) => {
      return value.replace('_', ' ');
    }
  );
  password: string | undefined;
  
  state: { [k: string]: any} | undefined;
  
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {
    
  }
  
  ngOnInit() {
    this.state = this.router.getCurrentNavigation()?.extras.state
  }
  
  signUp(): void {
    this.failText = '';
    console.log(this.joinRequest);
    if (
      this.joinRequest.name == null || 
      this.joinRequest.email == null || 
      this.joinRequest.password == null || 
      this.password == null || 
      this.joinRequest.labourLink == null
    ) {
      this.failText = 'You left one or more mandatory fields empty';      
      return;
    }
    if (this.joinRequest.password != this.password) {
      this.failText = 'Fields password and confirm must match exactly';
      return;
    }
    this.customerService.createCustomer(this.joinRequest)
        .subscribe({
          next: (createResponse) => {
            let token: string | null = createResponse.headers.get('Authorization');
            let id: IdResponse | null = (createResponse.body && createResponse.body.id) ? createResponse.body : null ;
            if (token && id) {
              localStorage.setItem('token', token);
              localStorage.setItem('id', JSON.stringify(id));
              let to = '';
              if (this.state) {
                to = this.state['to'];
              }
              this.router.navigate([to]);
            }
            else {
              this.failText = 'Inadecuate response from server for login attempt';
            }
          },
          error: (e) => {
            if (e.error.statusCode === 401) {
              this.failText = 'Incorrect password and / or username';
            }
            else if (e.error.statusCode === 403) {
              localStorage.clear();
              this.failText = 'That might have been on us. Please try again';
            }
            else if (e.error.statusCode === 409) {
              this.failText = 'We have that email in one of our users already';
            }
            else if (e.error.statusCode === 500) {
              this.failText = 'That might have been on us. Please try again';
            }
            else {
              this.failText = 'There was an unknown error. Please try again';
            }
          }
        });
  }
}
