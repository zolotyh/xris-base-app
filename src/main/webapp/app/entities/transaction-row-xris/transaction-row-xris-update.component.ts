import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITransactionRowXris, TransactionRowXris } from 'app/shared/model/transaction-row-xris.model';
import { TransactionRowXrisService } from './transaction-row-xris.service';
import { IGoodsXris } from 'app/shared/model/goods-xris.model';
import { GoodsXrisService } from 'app/entities/goods-xris/goods-xris.service';
import { IPriceXris } from 'app/shared/model/price-xris.model';
import { PriceXrisService } from 'app/entities/price-xris/price-xris.service';
import { IDiscountXris } from 'app/shared/model/discount-xris.model';
import { DiscountXrisService } from 'app/entities/discount-xris/discount-xris.service';

type SelectableEntity = IGoodsXris | IPriceXris | IDiscountXris;

@Component({
  selector: 'jhi-transaction-row-xris-update',
  templateUrl: './transaction-row-xris-update.component.html',
})
export class TransactionRowXrisUpdateComponent implements OnInit {
  isSaving = false;
  goods: IGoodsXris[] = [];
  prices: IPriceXris[] = [];
  discounts: IDiscountXris[] = [];

  editForm = this.fb.group({
    id: [],
    goods: [],
    price: [],
    discount: [],
  });

  constructor(
    protected transactionRowService: TransactionRowXrisService,
    protected goodsService: GoodsXrisService,
    protected priceService: PriceXrisService,
    protected discountService: DiscountXrisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactionRow }) => {
      this.updateForm(transactionRow);

      this.goodsService
        .query({ filter: 'transactionrow-is-null' })
        .pipe(
          map((res: HttpResponse<IGoodsXris[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IGoodsXris[]) => {
          if (!transactionRow.goods || !transactionRow.goods.id) {
            this.goods = resBody;
          } else {
            this.goodsService
              .find(transactionRow.goods.id)
              .pipe(
                map((subRes: HttpResponse<IGoodsXris>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IGoodsXris[]) => (this.goods = concatRes));
          }
        });

      this.priceService
        .query({ filter: 'transactionrow-is-null' })
        .pipe(
          map((res: HttpResponse<IPriceXris[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPriceXris[]) => {
          if (!transactionRow.price || !transactionRow.price.id) {
            this.prices = resBody;
          } else {
            this.priceService
              .find(transactionRow.price.id)
              .pipe(
                map((subRes: HttpResponse<IPriceXris>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPriceXris[]) => (this.prices = concatRes));
          }
        });

      this.discountService
        .query({ filter: 'transactionrow-is-null' })
        .pipe(
          map((res: HttpResponse<IDiscountXris[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDiscountXris[]) => {
          if (!transactionRow.discount || !transactionRow.discount.id) {
            this.discounts = resBody;
          } else {
            this.discountService
              .find(transactionRow.discount.id)
              .pipe(
                map((subRes: HttpResponse<IDiscountXris>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDiscountXris[]) => (this.discounts = concatRes));
          }
        });
    });
  }

  updateForm(transactionRow: ITransactionRowXris): void {
    this.editForm.patchValue({
      id: transactionRow.id,
      goods: transactionRow.goods,
      price: transactionRow.price,
      discount: transactionRow.discount,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transactionRow = this.createFromForm();
    if (transactionRow.id !== undefined) {
      this.subscribeToSaveResponse(this.transactionRowService.update(transactionRow));
    } else {
      this.subscribeToSaveResponse(this.transactionRowService.create(transactionRow));
    }
  }

  private createFromForm(): ITransactionRowXris {
    return {
      ...new TransactionRowXris(),
      id: this.editForm.get(['id'])!.value,
      goods: this.editForm.get(['goods'])!.value,
      price: this.editForm.get(['price'])!.value,
      discount: this.editForm.get(['discount'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionRowXris>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
