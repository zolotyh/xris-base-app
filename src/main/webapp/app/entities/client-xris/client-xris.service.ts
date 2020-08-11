import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IClientXris } from 'app/shared/model/client-xris.model';

type EntityResponseType = HttpResponse<IClientXris>;
type EntityArrayResponseType = HttpResponse<IClientXris[]>;

@Injectable({ providedIn: 'root' })
export class ClientXrisService {
  public resourceUrl = SERVER_API_URL + 'api/clients';

  constructor(protected http: HttpClient) {}

  create(client: IClientXris): Observable<EntityResponseType> {
    return this.http.post<IClientXris>(this.resourceUrl, client, { observe: 'response' });
  }

  update(client: IClientXris): Observable<EntityResponseType> {
    return this.http.put<IClientXris>(this.resourceUrl, client, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClientXris>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClientXris[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
