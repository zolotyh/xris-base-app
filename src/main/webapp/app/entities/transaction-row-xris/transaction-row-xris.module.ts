import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XrisSharedModule } from 'app/shared/shared.module';
import { TransactionRowXrisComponent } from './transaction-row-xris.component';
import { TransactionRowXrisDetailComponent } from './transaction-row-xris-detail.component';
import { TransactionRowXrisUpdateComponent } from './transaction-row-xris-update.component';
import { TransactionRowXrisDeleteDialogComponent } from './transaction-row-xris-delete-dialog.component';
import { transactionRowRoute } from './transaction-row-xris.route';

@NgModule({
  imports: [XrisSharedModule, RouterModule.forChild(transactionRowRoute)],
  declarations: [
    TransactionRowXrisComponent,
    TransactionRowXrisDetailComponent,
    TransactionRowXrisUpdateComponent,
    TransactionRowXrisDeleteDialogComponent,
  ],
  entryComponents: [TransactionRowXrisDeleteDialogComponent],
})
export class XrisTransactionRowXrisModule {}
