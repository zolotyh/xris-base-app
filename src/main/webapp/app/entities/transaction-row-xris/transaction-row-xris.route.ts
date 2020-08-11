import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITransactionRowXris, TransactionRowXris } from 'app/shared/model/transaction-row-xris.model';
import { TransactionRowXrisService } from './transaction-row-xris.service';
import { TransactionRowXrisComponent } from './transaction-row-xris.component';
import { TransactionRowXrisDetailComponent } from './transaction-row-xris-detail.component';
import { TransactionRowXrisUpdateComponent } from './transaction-row-xris-update.component';

@Injectable({ providedIn: 'root' })
export class TransactionRowXrisResolve implements Resolve<ITransactionRowXris> {
  constructor(private service: TransactionRowXrisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransactionRowXris> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((transactionRow: HttpResponse<TransactionRowXris>) => {
          if (transactionRow.body) {
            return of(transactionRow.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TransactionRowXris());
  }
}

export const transactionRowRoute: Routes = [
  {
    path: '',
    component: TransactionRowXrisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.transactionRow.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransactionRowXrisDetailComponent,
    resolve: {
      transactionRow: TransactionRowXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.transactionRow.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransactionRowXrisUpdateComponent,
    resolve: {
      transactionRow: TransactionRowXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.transactionRow.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransactionRowXrisUpdateComponent,
    resolve: {
      transactionRow: TransactionRowXrisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'xrisApp.transactionRow.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
