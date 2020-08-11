import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiscountXris } from 'app/shared/model/discount-xris.model';
import { DiscountXrisService } from './discount-xris.service';

@Component({
  templateUrl: './discount-xris-delete-dialog.component.html',
})
export class DiscountXrisDeleteDialogComponent {
  discount?: IDiscountXris;

  constructor(
    protected discountService: DiscountXrisService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.discountService.delete(id).subscribe(() => {
      this.eventManager.broadcast('discountListModification');
      this.activeModal.close();
    });
  }
}
