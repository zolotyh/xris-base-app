import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPriceXris, PriceXris } from 'app/shared/model/price-xris.model';
import { PriceXrisService } from './price-xris.service';
import { PriceXrisComponent } from './price-xris.component';
import { PriceXrisDetailComponent } from './price-xris-detail.component';
import { PriceXrisUpdateComponent } from './price-xris-update.component';

@Injectable({ providedIn: 'root' })
export class PriceXrisResolve implements Resolve<IPriceXris> {
  constructor(private service: PriceXrisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPriceXris> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((price: HttpResponse<PriceXris>) => {
          if (price.body) {
            return of(price.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PriceXris());
  }
}

export const priceRoute: Routes = [
  {
    path: '',
    component: PriceXrisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.price.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PriceXrisDetailComponent,
    resolve: {
      price: PriceXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.price.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PriceXrisUpdateComponent,
    resolve: {
      price: PriceXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.price.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PriceXrisUpdateComponent,
    resolve: {
      price: PriceXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.price.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
