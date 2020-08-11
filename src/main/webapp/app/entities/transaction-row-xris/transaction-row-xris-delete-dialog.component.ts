import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransactionRowXris } from 'app/shared/model/transaction-row-xris.model';
import { TransactionRowXrisService } from './transaction-row-xris.service';

@Component({
  templateUrl: './transaction-row-xris-delete-dialog.component.html',
})
export class TransactionRowXrisDeleteDialogComponent {
  transactionRow?: ITransactionRowXris;

  constructor(
    protected transactionRowService: TransactionRowXrisService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transactionRowService.delete(id).subscribe(() => {
      this.eventManager.broadcast('transactionRowListModification');
      this.activeModal.close();
    });
  }
}
