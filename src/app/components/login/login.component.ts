import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';
import { IdResponse } from 'src/app/models/id-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  failText: string = '';
  authenticationRequest: AuthenticationRequest = {};
  state: { [k: string]: any} | undefined;
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.state = this.router.getCurrentNavigation()?.extras.state
  }
  
  login(): void {
    this.failText = '';
    this.authenticationService.login(this.authenticationRequest)
        .subscribe({
          next: (authenticationResponse) => {
            let token: string | null = authenticationResponse.headers.get('Authorization');
            let id: IdResponse | null = (authenticationResponse.body && authenticationResponse.body.id) ? authenticationResponse.body : null ;
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
