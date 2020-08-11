import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClientXris, ClientXris } from 'app/shared/model/client-xris.model';
import { ClientXrisService } from './client-xris.service';
import { ClientXrisComponent } from './client-xris.component';
import { ClientXrisDetailComponent } from './client-xris-detail.component';
import { ClientXrisUpdateComponent } from './client-xris-update.component';

@Injectable({ providedIn: 'root' })
export class ClientXrisResolve implements Resolve<IClientXris> {
  constructor(private service: ClientXrisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClientXris> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((client: HttpResponse<ClientXris>) => {
          if (client.body) {
            return of(client.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ClientXris());
  }
}

export const clientRoute: Routes = [
  {
    path: '',
    component: ClientXrisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.client.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClientXrisDetailComponent,
    resolve: {
      client: ClientXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.client.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClientXrisUpdateComponent,
    resolve: {
      client: ClientXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.client.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClientXrisUpdateComponent,
    resolve: {
      client: ClientXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.client.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
