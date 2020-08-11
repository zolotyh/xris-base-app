import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPriceXris, PriceXris } from 'app/shared/model/price-xris.model';
import { PriceXrisService } from './price-xris.service';
import { IDiscountXris } from 'app/shared/model/discount-xris.model';
import { DiscountXrisService } from 'app/entities/discount-xris/discount-xris.service';

@Component({
  selector: 'jhi-price-xris-update',
  templateUrl: './price-xris-update.component.html',
})
export class PriceXrisUpdateComponent implements OnInit {
  isSaving = false;
  discounts: IDiscountXris[] = [];

  editForm = this.fb.group({
    id: [],
    value: [],
    price: [],
  });

  constructor(
    protected priceService: PriceXrisService,
    protected discountService: DiscountXrisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ price }) => {
      this.updateForm(price);

      this.discountService.query().subscribe((res: HttpResponse<IDiscountXris[]>) => (this.discounts = res.body || []));
    });
  }

  updateForm(price: IPriceXris): void {
    this.editForm.patchValue({
      id: price.id,
      value: price.value,
      price: price.price,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const price = this.createFromForm();
    if (price.id !== undefined) {
      this.subscribeToSaveResponse(this.priceService.update(price));
    } else {
      this.subscribeToSaveResponse(this.priceService.create(price));
    }
  }

  private createFromForm(): IPriceXris {
    return {
      ...new PriceXris(),
      id: this.editForm.get(['id'])!.value,
      value: this.editForm.get(['value'])!.value,
      price: this.editForm.get(['price'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPriceXris>>): void {
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

  trackById(index: number, item: IDiscountXris): any {
    return item.id;
  }
}
