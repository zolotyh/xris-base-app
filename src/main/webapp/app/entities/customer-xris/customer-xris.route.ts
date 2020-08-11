import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICustomerXris, CustomerXris } from 'app/shared/model/customer-xris.model';
import { CustomerXrisService } from './customer-xris.service';
import { CustomerXrisComponent } from './customer-xris.component';
import { CustomerXrisDetailComponent } from './customer-xris-detail.component';
import { CustomerXrisUpdateComponent } from './customer-xris-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerXrisResolve implements Resolve<ICustomerXris> {
  constructor(private service: CustomerXrisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerXris> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customer: HttpResponse<CustomerXris>) => {
          if (customer.body) {
            return of(customer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerXris());
  }
}

export const customerRoute: Routes = [
  {
    path: '',
    component: CustomerXrisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.customer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerXrisDetailComponent,
    resolve: {
      customer: CustomerXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.customer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerXrisUpdateComponent,
    resolve: {
      customer: CustomerXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.customer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerXrisUpdateComponent,
    resolve: {
      customer: CustomerXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.customer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
