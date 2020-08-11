import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XrisSharedModule } from 'app/shared/shared.module';
import { TransactionXrisComponent } from './transaction-xris.component';
import { TransactionXrisDetailComponent } from './transaction-xris-detail.component';
import { TransactionXrisUpdateComponent } from './transaction-xris-update.component';
import { TransactionXrisDeleteDialogComponent } from './transaction-xris-delete-dialog.component';
import { transactionRoute } from './transaction-xris.route';

@NgModule({
  imports: [XrisSharedModule, RouterModule.forChild(transactionRoute)],
  declarations: [
    TransactionXrisComponent,
    TransactionXrisDetailComponent,
    TransactionXrisUpdateComponent,
    TransactionXrisDeleteDialogComponent,
  ],
  entryComponents: [TransactionXrisDeleteDialogComponent],
})
export class XrisTransactionXrisModule {}
