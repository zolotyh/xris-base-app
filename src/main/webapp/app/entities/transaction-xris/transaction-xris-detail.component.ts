import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionXris } from 'app/shared/model/transaction-xris.model';

@Component({
  selector: 'jhi-transaction-xris-detail',
  templateUrl: './transaction-xris-detail.component.html',
})
export class TransactionXrisDetailComponent implements OnInit {
  transaction: ITransactionXris | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transaction }) => (this.transaction = transaction));
  }

  previousState(): void {
    window.history.back();
  }
}
