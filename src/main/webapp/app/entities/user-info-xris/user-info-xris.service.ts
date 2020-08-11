import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserInfoXris } from 'app/shared/model/user-info-xris.model';

type EntityResponseType = HttpResponse<IUserInfoXris>;
type EntityArrayResponseType = HttpResponse<IUserInfoXris[]>;

@Injectable({ providedIn: 'root' })
export class UserInfoXrisService {
  public resourceUrl = SERVER_API_URL + 'api/user-infos';

  constructor(protected http: HttpClient) {}

  create(userInfo: IUserInfoXris): Observable<EntityResponseType> {
    return this.http.post<IUserInfoXris>(this.resourceUrl, userInfo, { observe: 'response' });
  }

  update(userInfo: IUserInfoXris): Observable<EntityResponseType> {
    return this.http.put<IUserInfoXris>(this.resourceUrl, userInfo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserInfoXris>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserInfoXris[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
