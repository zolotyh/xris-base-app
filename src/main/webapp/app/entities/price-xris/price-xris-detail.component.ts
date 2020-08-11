import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPriceXris } from 'app/shared/model/price-xris.model';

@Component({
  selector: 'jhi-price-xris-detail',
  templateUrl: './price-xris-detail.component.html',
})
export class PriceXrisDetailComponent implements OnInit {
  price: IPriceXris | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ price }) => (this.price = price));
  }

  previousState(): void {
    window.history.back();
  }
}
