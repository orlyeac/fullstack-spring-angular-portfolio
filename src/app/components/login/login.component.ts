import { Component } from '@angular/core';
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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    
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
              this.router.navigate(['customers']);
            }
            else {
              this.failText = 'Inadecuate response from server for login attempt';
            }
          },
          error: (e) => {
            if (e.error.statusCode === 401) {
              this.failText = 'Incorrect password and / or username';
            }
          }
        });
  }
}
