import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerXris } from 'app/shared/model/customer-xris.model';

@Component({
  selector: 'jhi-customer-xris-detail',
  templateUrl: './customer-xris-detail.component.html',
})
export class CustomerXrisDetailComponent implements OnInit {
  customer: ICustomerXris | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => (this.customer = customer));
  }

  previousState(): void {
    window.history.back();
  }
}
