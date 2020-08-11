import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XrisSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [XrisSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class XrisHomeModule {}
