import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPriceXris } from 'app/shared/model/price-xris.model';

type EntityResponseType = HttpResponse<IPriceXris>;
type EntityArrayResponseType = HttpResponse<IPriceXris[]>;

@Injectable({ providedIn: 'root' })
export class PriceXrisService {
  public resourceUrl = SERVER_API_URL + 'api/prices';

  constructor(protected http: HttpClient) {}

  create(price: IPriceXris): Observable<EntityResponseType> {
    return this.http.post<IPriceXris>(this.resourceUrl, price, { observe: 'response' });
  }

  update(price: IPriceXris): Observable<EntityResponseType> {
    return this.http.put<IPriceXris>(this.resourceUrl, price, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPriceXris>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPriceXris[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
