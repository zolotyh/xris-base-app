import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGoodsXris } from 'app/shared/model/goods-xris.model';
import { GoodsXrisService } from './goods-xris.service';

@Component({
  templateUrl: './goods-xris-delete-dialog.component.html',
})
export class GoodsXrisDeleteDialogComponent {
  goods?: IGoodsXris;

  constructor(protected goodsService: GoodsXrisService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.goodsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('goodsListModification');
      this.activeModal.close();
    });
  }
}
