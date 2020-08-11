import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransactionXris } from 'app/shared/model/transaction-xris.model';
import { TransactionXrisService } from './transaction-xris.service';

@Component({
  templateUrl: './transaction-xris-delete-dialog.component.html',
})
export class TransactionXrisDeleteDialogComponent {
  transaction?: ITransactionXris;

  constructor(
    protected transactionService: TransactionXrisService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transactionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('transactionListModification');
      this.activeModal.close();
    });
  }
}
