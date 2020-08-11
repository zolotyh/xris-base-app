import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDepartmentXris, DepartmentXris } from 'app/shared/model/department-xris.model';
import { DepartmentXrisService } from './department-xris.service';
import { DepartmentXrisComponent } from './department-xris.component';
import { DepartmentXrisDetailComponent } from './department-xris-detail.component';
import { DepartmentXrisUpdateComponent } from './department-xris-update.component';

@Injectable({ providedIn: 'root' })
export class DepartmentXrisResolve implements Resolve<IDepartmentXris> {
  constructor(private service: DepartmentXrisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartmentXris> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((department: HttpResponse<DepartmentXris>) => {
          if (department.body) {
            return of(department.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DepartmentXris());
  }
}

export const departmentRoute: Routes = [
  {
    path: '',
    component: DepartmentXrisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DepartmentXrisDetailComponent,
    resolve: {
      department: DepartmentXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DepartmentXrisUpdateComponent,
    resolve: {
      department: DepartmentXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DepartmentXrisUpdateComponent,
    resolve: {
      department: DepartmentXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
