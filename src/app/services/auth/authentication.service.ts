import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { Observable } from 'rxjs';
import { IdResponse } from 'src/app/models/id-response';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
    
  }

  login(
    authenticationRequest: AuthenticationRequest
  ): Observable<HttpResponse<IdResponse>> {
    return this.http.post<IdResponse>(
      `${environment.api.url}/${environment.api.authUrl}`,
      authenticationRequest,
      { observe: 'response' }
    );
  }
}
