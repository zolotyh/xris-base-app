import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserInfoXris, UserInfoXris } from 'app/shared/model/user-info-xris.model';
import { UserInfoXrisService } from './user-info-xris.service';
import { UserInfoXrisComponent } from './user-info-xris.component';
import { UserInfoXrisDetailComponent } from './user-info-xris-detail.component';
import { UserInfoXrisUpdateComponent } from './user-info-xris-update.component';

@Injectable({ providedIn: 'root' })
export class UserInfoXrisResolve implements Resolve<IUserInfoXris> {
  constructor(private service: UserInfoXrisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserInfoXris> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userInfo: HttpResponse<UserInfoXris>) => {
          if (userInfo.body) {
            return of(userInfo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserInfoXris());
  }
}

export const userInfoRoute: Routes = [
  {
    path: '',
    component: UserInfoXrisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.userInfo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserInfoXrisDetailComponent,
    resolve: {
      userInfo: UserInfoXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.userInfo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserInfoXrisUpdateComponent,
    resolve: {
      userInfo: UserInfoXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.userInfo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserInfoXrisUpdateComponent,
    resolve: {
      userInfo: UserInfoXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.userInfo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
