import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XrisSharedModule } from 'app/shared/shared.module';
import { CustomerXrisComponent } from './customer-xris.component';
import { CustomerXrisDetailComponent } from './customer-xris-detail.component';
import { CustomerXrisUpdateComponent } from './customer-xris-update.component';
import { CustomerXrisDeleteDialogComponent } from './customer-xris-delete-dialog.component';
import { customerRoute } from './customer-xris.route';

@NgModule({
  imports: [XrisSharedModule, RouterModule.forChild(customerRoute)],
  declarations: [CustomerXrisComponent, CustomerXrisDetailComponent, CustomerXrisUpdateComponent, CustomerXrisDeleteDialogComponent],
  entryComponents: [CustomerXrisDeleteDialogComponent],
})
export class XrisCustomerXrisModule {}
