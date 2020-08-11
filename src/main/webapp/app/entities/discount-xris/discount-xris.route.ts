import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiscountXris, DiscountXris } from 'app/shared/model/discount-xris.model';
import { DiscountXrisService } from './discount-xris.service';
import { DiscountXrisComponent } from './discount-xris.component';
import { DiscountXrisDetailComponent } from './discount-xris-detail.component';
import { DiscountXrisUpdateComponent } from './discount-xris-update.component';

@Injectable({ providedIn: 'root' })
export class DiscountXrisResolve implements Resolve<IDiscountXris> {
  constructor(private service: DiscountXrisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiscountXris> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((discount: HttpResponse<DiscountXris>) => {
          if (discount.body) {
            return of(discount.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DiscountXris());
  }
}

export const discountRoute: Routes = [
  {
    path: '',
    component: DiscountXrisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.discount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiscountXrisDetailComponent,
    resolve: {
      discount: DiscountXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.discount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiscountXrisUpdateComponent,
    resolve: {
      discount: DiscountXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.discount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiscountXrisUpdateComponent,
    resolve: {
      discount: DiscountXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.discount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
