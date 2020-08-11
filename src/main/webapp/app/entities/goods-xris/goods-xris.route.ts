import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGoodsXris, GoodsXris } from 'app/shared/model/goods-xris.model';
import { GoodsXrisService } from './goods-xris.service';
import { GoodsXrisComponent } from './goods-xris.component';
import { GoodsXrisDetailComponent } from './goods-xris-detail.component';
import { GoodsXrisUpdateComponent } from './goods-xris-update.component';

@Injectable({ providedIn: 'root' })
export class GoodsXrisResolve implements Resolve<IGoodsXris> {
  constructor(private service: GoodsXrisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGoodsXris> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((goods: HttpResponse<GoodsXris>) => {
          if (goods.body) {
            return of(goods.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GoodsXris());
  }
}

export const goodsRoute: Routes = [
  {
    path: '',
    component: GoodsXrisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.goods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GoodsXrisDetailComponent,
    resolve: {
      goods: GoodsXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.goods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GoodsXrisUpdateComponent,
    resolve: {
      goods: GoodsXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.goods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GoodsXrisUpdateComponent,
    resolve: {
      goods: GoodsXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.goods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
