import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDiscountXris } from 'app/shared/model/discount-xris.model';

type EntityResponseType = HttpResponse<IDiscountXris>;
type EntityArrayResponseType = HttpResponse<IDiscountXris[]>;

@Injectable({ providedIn: 'root' })
export class DiscountXrisService {
  public resourceUrl = SERVER_API_URL + 'api/discounts';

  constructor(protected http: HttpClient) {}

  create(discount: IDiscountXris): Observable<EntityResponseType> {
    return this.http.post<IDiscountXris>(this.resourceUrl, discount, { observe: 'response' });
  }

  update(discount: IDiscountXris): Observable<EntityResponseType> {
    return this.http.put<IDiscountXris>(this.resourceUrl, discount, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiscountXris>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiscountXris[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
