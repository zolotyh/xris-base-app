import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITransactionXris, TransactionXris } from 'app/shared/model/transaction-xris.model';
import { TransactionXrisService } from './transaction-xris.service';
import { TransactionXrisComponent } from './transaction-xris.component';
import { TransactionXrisDetailComponent } from './transaction-xris-detail.component';
import { TransactionXrisUpdateComponent } from './transaction-xris-update.component';

@Injectable({ providedIn: 'root' })
export class TransactionXrisResolve implements Resolve<ITransactionXris> {
  constructor(private service: TransactionXrisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransactionXris> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((transaction: HttpResponse<TransactionXris>) => {
          if (transaction.body) {
            return of(transaction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TransactionXris());
  }
}

export const transactionRoute: Routes = [
  {
    path: '',
    component: TransactionXrisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.transaction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransactionXrisDetailComponent,
    resolve: {
      transaction: TransactionXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.transaction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransactionXrisUpdateComponent,
    resolve: {
      transaction: TransactionXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.transaction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransactionXrisUpdateComponent,
    resolve: {
      transaction: TransactionXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.transaction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
