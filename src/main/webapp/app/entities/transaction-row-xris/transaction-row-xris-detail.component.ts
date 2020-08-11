import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionRowXris } from 'app/shared/model/transaction-row-xris.model';

@Component({
  selector: 'jhi-transaction-row-xris-detail',
  templateUrl: './transaction-row-xris-detail.component.html',
})
export class TransactionRowXrisDetailComponent implements OnInit {
  transactionRow: ITransactionRowXris | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactionRow }) => (this.transactionRow = transactionRow));
  }

  previousState(): void {
    window.history.back();
  }
}
