import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XrisSharedModule } from 'app/shared/shared.module';
import { UserInfoXrisComponent } from './user-info-xris.component';
import { UserInfoXrisDetailComponent } from './user-info-xris-detail.component';
import { UserInfoXrisUpdateComponent } from './user-info-xris-update.component';
import { UserInfoXrisDeleteDialogComponent } from './user-info-xris-delete-dialog.component';
import { userInfoRoute } from './user-info-xris.route';

@NgModule({
  imports: [XrisSharedModule, RouterModule.forChild(userInfoRoute)],
  declarations: [UserInfoXrisComponent, UserInfoXrisDetailComponent, UserInfoXrisUpdateComponent, UserInfoXrisDeleteDialogComponent],
  entryComponents: [UserInfoXrisDeleteDialogComponent],
})
export class XrisUserInfoXrisModule {}
