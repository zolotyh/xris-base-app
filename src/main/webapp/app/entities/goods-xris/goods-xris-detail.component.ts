import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGoodsXris } from 'app/shared/model/goods-xris.model';

@Component({
  selector: 'jhi-goods-xris-detail',
  templateUrl: './goods-xris-detail.component.html',
})
export class GoodsXrisDetailComponent implements OnInit {
  goods: IGoodsXris | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ goods }) => (this.goods = goods));
  }

  previousState(): void {
    window.history.back();
  }
}
