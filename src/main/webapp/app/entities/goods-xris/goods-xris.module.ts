import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XrisSharedModule } from 'app/shared/shared.module';
import { GoodsXrisComponent } from './goods-xris.component';
import { GoodsXrisDetailComponent } from './goods-xris-detail.component';
import { GoodsXrisUpdateComponent } from './goods-xris-update.component';
import { GoodsXrisDeleteDialogComponent } from './goods-xris-delete-dialog.component';
import { goodsRoute } from './goods-xris.route';

@NgModule({
  imports: [XrisSharedModule, RouterModule.forChild(goodsRoute)],
  declarations: [GoodsXrisComponent, GoodsXrisDetailComponent, GoodsXrisUpdateComponent, GoodsXrisDeleteDialogComponent],
  entryComponents: [GoodsXrisDeleteDialogComponent],
})
export class XrisGoodsXrisModule {}
