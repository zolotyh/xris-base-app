import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerXris } from 'app/shared/model/customer-xris.model';
import { CustomerXrisService } from './customer-xris.service';

@Component({
  templateUrl: './customer-xris-delete-dialog.component.html',
})
export class CustomerXrisDeleteDialogComponent {
  customer?: ICustomerXris;

  constructor(
    protected customerService: CustomerXrisService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerListModification');
      this.activeModal.close();
    });
  }
}
