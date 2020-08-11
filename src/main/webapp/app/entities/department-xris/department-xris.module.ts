import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XrisSharedModule } from 'app/shared/shared.module';
import { DepartmentXrisComponent } from './department-xris.component';
import { DepartmentXrisDetailComponent } from './department-xris-detail.component';
import { DepartmentXrisUpdateComponent } from './department-xris-update.component';
import { DepartmentXrisDeleteDialogComponent } from './department-xris-delete-dialog.component';
import { departmentRoute } from './department-xris.route';

@NgModule({
  imports: [XrisSharedModule, RouterModule.forChild(departmentRoute)],
  declarations: [
    DepartmentXrisComponent,
    DepartmentXrisDetailComponent,
    DepartmentXrisUpdateComponent,
    DepartmentXrisDeleteDialogComponent,
  ],
  entryComponents: [DepartmentXrisDeleteDialogComponent],
})
export class XrisDepartmentXrisModule {}
