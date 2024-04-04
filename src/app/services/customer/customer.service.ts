import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponse } from 'src/app/models/customer-response';
import { IdResponse } from 'src/app/models/id-response';
import { JoinRequest } from 'src/app/models/join-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<CustomerResponse[]> {
    return this.http.get<CustomerResponse[]>(
      `${environment.api.url}/${environment.api.customerUrl}`
    );
  }

  getCustomer(id: number): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(
      `${environment.api.url}/${environment.api.customerUrl}/${id}`
    );
  }

  createCustomer(
    joinRequest: JoinRequest
  ): Observable<HttpResponse<IdResponse>> {
    return this.http.post<IdResponse>(
      `${environment.api.url}/${environment.api.customerUrl}`,
      joinRequest,
      { observe: 'response' }
    );
  }
}
