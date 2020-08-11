import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDepartmentXris } from 'app/shared/model/department-xris.model';

type EntityResponseType = HttpResponse<IDepartmentXris>;
type EntityArrayResponseType = HttpResponse<IDepartmentXris[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentXrisService {
  public resourceUrl = SERVER_API_URL + 'api/departments';

  constructor(protected http: HttpClient) {}

  create(department: IDepartmentXris): Observable<EntityResponseType> {
    return this.http.post<IDepartmentXris>(this.resourceUrl, department, { observe: 'response' });
  }

  update(department: IDepartmentXris): Observable<EntityResponseType> {
    return this.http.put<IDepartmentXris>(this.resourceUrl, department, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepartmentXris>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartmentXris[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
