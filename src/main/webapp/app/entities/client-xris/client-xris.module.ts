import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XrisSharedModule } from 'app/shared/shared.module';
import { ClientXrisComponent } from './client-xris.component';
import { ClientXrisDetailComponent } from './client-xris-detail.component';
import { ClientXrisUpdateComponent } from './client-xris-update.component';
import { ClientXrisDeleteDialogComponent } from './client-xris-delete-dialog.component';
import { clientRoute } from './client-xris.route';

@NgModule({
  imports: [XrisSharedModule, RouterModule.forChild(clientRoute)],
  declarations: [ClientXrisComponent, ClientXrisDetailComponent, ClientXrisUpdateComponent, ClientXrisDeleteDialogComponent],
  entryComponents: [ClientXrisDeleteDialogComponent],
})
export class XrisClientXrisModule {}
