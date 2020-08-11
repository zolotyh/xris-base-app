import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiscountXris } from 'app/shared/model/discount-xris.model';

@Component({
  selector: 'jhi-discount-xris-detail',
  templateUrl: './discount-xris-detail.component.html',
})
export class DiscountXrisDetailComponent implements OnInit {
  discount: IDiscountXris | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ discount }) => (this.discount = discount));
  }

  previousState(): void {
    window.history.back();
  }
}
