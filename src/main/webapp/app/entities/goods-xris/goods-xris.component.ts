import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGoodsXris } from 'app/shared/model/goods-xris.model';
import { GoodsXrisService } from './goods-xris.service';
import { GoodsXrisDeleteDialogComponent } from './goods-xris-delete-dialog.component';

@Component({
  selector: 'jhi-goods-xris',
  templateUrl: './goods-xris.component.html',
})
export class GoodsXrisComponent implements OnInit, OnDestroy {
  goods?: IGoodsXris[];
  eventSubscriber?: Subscription;

  constructor(protected goodsService: GoodsXrisService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.goodsService.query().subscribe((res: HttpResponse<IGoodsXris[]>) => (this.goods = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGoods();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGoodsXris): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGoods(): void {
    this.eventSubscriber = this.eventManager.subscribe('goodsListModification', () => this.loadAll());
  }

  delete(goods: IGoodsXris): void {
    const modalRef = this.modalService.open(GoodsXrisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.goods = goods;
  }
}
