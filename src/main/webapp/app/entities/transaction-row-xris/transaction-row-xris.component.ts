import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransactionRowXris } from 'app/shared/model/transaction-row-xris.model';
import { TransactionRowXrisService } from './transaction-row-xris.service';
import { TransactionRowXrisDeleteDialogComponent } from './transaction-row-xris-delete-dialog.component';

@Component({
  selector: 'jhi-transaction-row-xris',
  templateUrl: './transaction-row-xris.component.html',
})
export class TransactionRowXrisComponent implements OnInit, OnDestroy {
  transactionRows?: ITransactionRowXris[];
  eventSubscriber?: Subscription;

  constructor(
    protected transactionRowService: TransactionRowXrisService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.transactionRowService.query().subscribe((res: HttpResponse<ITransactionRowXris[]>) => (this.transactionRows = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTransactionRows();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITransactionRowXris): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTransactionRows(): void {
    this.eventSubscriber = this.eventManager.subscribe('transactionRowListModification', () => this.loadAll());
  }

  delete(transactionRow: ITransactionRowXris): void {
    const modalRef = this.modalService.open(TransactionRowXrisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transactionRow = transactionRow;
  }
}
