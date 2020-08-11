import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGoodsXris } from 'app/shared/model/goods-xris.model';

type EntityResponseType = HttpResponse<IGoodsXris>;
type EntityArrayResponseType = HttpResponse<IGoodsXris[]>;

@Injectable({ providedIn: 'root' })
export class GoodsXrisService {
  public resourceUrl = SERVER_API_URL + 'api/goods';

  constructor(protected http: HttpClient) {}

  create(goods: IGoodsXris): Observable<EntityResponseType> {
    return this.http.post<IGoodsXris>(this.resourceUrl, goods, { observe: 'response' });
  }

  update(goods: IGoodsXris): Observable<EntityResponseType> {
    return this.http.put<IGoodsXris>(this.resourceUrl, goods, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGoodsXris>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGoodsXris[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
