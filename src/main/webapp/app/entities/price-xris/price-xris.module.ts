import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XrisSharedModule } from 'app/shared/shared.module';
import { PriceXrisComponent } from './price-xris.component';
import { PriceXrisDetailComponent } from './price-xris-detail.component';
import { PriceXrisUpdateComponent } from './price-xris-update.component';
import { PriceXrisDeleteDialogComponent } from './price-xris-delete-dialog.component';
import { priceRoute } from './price-xris.route';

@NgModule({
  imports: [XrisSharedModule, RouterModule.forChild(priceRoute)],
  declarations: [PriceXrisComponent, PriceXrisDetailComponent, PriceXrisUpdateComponent, PriceXrisDeleteDialogComponent],
  entryComponents: [PriceXrisDeleteDialogComponent],
})
export class XrisPriceXrisModule {}
