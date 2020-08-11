import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerXris } from 'app/shared/model/customer-xris.model';

type EntityResponseType = HttpResponse<ICustomerXris>;
type EntityArrayResponseType = HttpResponse<ICustomerXris[]>;

@Injectable({ providedIn: 'root' })
export class CustomerXrisService {
  public resourceUrl = SERVER_API_URL + 'api/customers';

  constructor(protected http: HttpClient) {}

  create(customer: ICustomerXris): Observable<EntityResponseType> {
    return this.http.post<ICustomerXris>(this.resourceUrl, customer, { observe: 'response' });
  }

  update(customer: ICustomerXris): Observable<EntityResponseType> {
    return this.http.put<ICustomerXris>(this.resourceUrl, customer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomerXris>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerXris[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
