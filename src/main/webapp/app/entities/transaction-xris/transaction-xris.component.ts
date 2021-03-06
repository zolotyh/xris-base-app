import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransactionXris } from 'app/shared/model/transaction-xris.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TransactionXrisService } from './transaction-xris.service';
import { TransactionXrisDeleteDialogComponent } from './transaction-xris-delete-dialog.component';

@Component({
  selector: 'jhi-transaction-xris',
  templateUrl: './transaction-xris.component.html',
})
export class TransactionXrisComponent implements OnInit, OnDestroy {
  transactions: ITransactionXris[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected transactionService: TransactionXrisService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.transactions = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.transactionService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<ITransactionXris[]>) => this.paginateTransactions(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.transactions = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTransactions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITransactionXris): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTransactions(): void {
    this.eventSubscriber = this.eventManager.subscribe('transactionListModification', () => this.reset());
  }

  delete(transaction: ITransactionXris): void {
    const modalRef = this.modalService.open(TransactionXrisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transaction = transaction;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTransactions(data: ITransactionXris[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.transactions.push(data[i]);
      }
    }
  }
}
