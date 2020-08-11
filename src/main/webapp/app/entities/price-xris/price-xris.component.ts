import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPriceXris } from 'app/shared/model/price-xris.model';
import { PriceXrisService } from './price-xris.service';
import { PriceXrisDeleteDialogComponent } from './price-xris-delete-dialog.component';

@Component({
  selector: 'jhi-price-xris',
  templateUrl: './price-xris.component.html',
})
export class PriceXrisComponent implements OnInit, OnDestroy {
  prices?: IPriceXris[];
  eventSubscriber?: Subscription;

  constructor(protected priceService: PriceXrisService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.priceService.query().subscribe((res: HttpResponse<IPriceXris[]>) => (this.prices = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPrices();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPriceXris): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPrices(): void {
    this.eventSubscriber = this.eventManager.subscribe('priceListModification', () => this.loadAll());
  }

  delete(price: IPriceXris): void {
    const modalRef = this.modalService.open(PriceXrisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.price = price;
  }
}
