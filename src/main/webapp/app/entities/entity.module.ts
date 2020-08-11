import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client-xris',
        loadChildren: () => import('./client-xris/client-xris.module').then(m => m.XrisClientXrisModule),
      },
      {
        path: 'department-xris',
        loadChildren: () => import('./department-xris/department-xris.module').then(m => m.XrisDepartmentXrisModule),
      },
      {
        path: 'customer-xris',
        loadChildren: () => import('./customer-xris/customer-xris.module').then(m => m.XrisCustomerXrisModule),
      },
      {
        path: 'user-info-xris',
        loadChildren: () => import('./user-info-xris/user-info-xris.module').then(m => m.XrisUserInfoXrisModule),
      },
      {
        path: 'goods-xris',
        loadChildren: () => import('./goods-xris/goods-xris.module').then(m => m.XrisGoodsXrisModule),
      },
      {
        path: 'price-xris',
        loadChildren: () => import('./price-xris/price-xris.module').then(m => m.XrisPriceXrisModule),
      },
      {
        path: 'discount-xris',
        loadChildren: () => import('./discount-xris/discount-xris.module').then(m => m.XrisDiscountXrisModule),
      },
      {
        path: 'transaction-xris',
        loadChildren: () => import('./transaction-xris/transaction-xris.module').then(m => m.XrisTransactionXrisModule),
      },
      {
        path: 'transaction-row-xris',
        loadChildren: () => import('./transaction-row-xris/transaction-row-xris.module').then(m => m.XrisTransactionRowXrisModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class XrisEntityModule {}
