import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiscountXris } from 'app/shared/model/discount-xris.model';
import { DiscountXrisService } from './discount-xris.service';
import { DiscountXrisDeleteDialogComponent } from './discount-xris-delete-dialog.component';

@Component({
  selector: 'jhi-discount-xris',
  templateUrl: './discount-xris.component.html',
})
export class DiscountXrisComponent implements OnInit, OnDestroy {
  discounts?: IDiscountXris[];
  eventSubscriber?: Subscription;

  constructor(protected discountService: DiscountXrisService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.discountService.query().subscribe((res: HttpResponse<IDiscountXris[]>) => (this.discounts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiscounts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiscountXris): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiscounts(): void {
    this.eventSubscriber = this.eventManager.subscribe('discountListModification', () => this.loadAll());
  }

  delete(discount: IDiscountXris): void {
    const modalRef = this.modalService.open(DiscountXrisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.discount = discount;
  }
}
