import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPriceXris } from 'app/shared/model/price-xris.model';
import { PriceXrisService } from './price-xris.service';

@Component({
  templateUrl: './price-xris-delete-dialog.component.html',
})
export class PriceXrisDeleteDialogComponent {
  price?: IPriceXris;

  constructor(protected priceService: PriceXrisService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.priceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('priceListModification');
      this.activeModal.close();
    });
  }
}
