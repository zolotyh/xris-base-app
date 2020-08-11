import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XrisSharedModule } from 'app/shared/shared.module';
import { DiscountXrisComponent } from './discount-xris.component';
import { DiscountXrisDetailComponent } from './discount-xris-detail.component';
import { DiscountXrisUpdateComponent } from './discount-xris-update.component';
import { DiscountXrisDeleteDialogComponent } from './discount-xris-delete-dialog.component';
import { discountRoute } from './discount-xris.route';

@NgModule({
  imports: [XrisSharedModule, RouterModule.forChild(discountRoute)],
  declarations: [DiscountXrisComponent, DiscountXrisDetailComponent, DiscountXrisUpdateComponent, DiscountXrisDeleteDialogComponent],
  entryComponents: [DiscountXrisDeleteDialogComponent],
})
export class XrisDiscountXrisModule {}
