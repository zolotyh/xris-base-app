import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGoodsXris, GoodsXris } from 'app/shared/model/goods-xris.model';
import { GoodsXrisService } from './goods-xris.service';
import { IPriceXris } from 'app/shared/model/price-xris.model';
import { PriceXrisService } from 'app/entities/price-xris/price-xris.service';

@Component({
  selector: 'jhi-goods-xris-update',
  templateUrl: './goods-xris-update.component.html',
})
export class GoodsXrisUpdateComponent implements OnInit {
  isSaving = false;
  prices: IPriceXris[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    goods: [],
  });

  constructor(
    protected goodsService: GoodsXrisService,
    protected priceService: PriceXrisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ goods }) => {
      this.updateForm(goods);

      this.priceService.query().subscribe((res: HttpResponse<IPriceXris[]>) => (this.prices = res.body || []));
    });
  }

  updateForm(goods: IGoodsXris): void {
    this.editForm.patchValue({
      id: goods.id,
      name: goods.name,
      description: goods.description,
      goods: goods.goods,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const goods = this.createFromForm();
    if (goods.id !== undefined) {
      this.subscribeToSaveResponse(this.goodsService.update(goods));
    } else {
      this.subscribeToSaveResponse(this.goodsService.create(goods));
    }
  }

  private createFromForm(): IGoodsXris {
    return {
      ...new GoodsXris(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      goods: this.editForm.get(['goods'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGoodsXris>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPriceXris): any {
    return item.id;
  }
}
