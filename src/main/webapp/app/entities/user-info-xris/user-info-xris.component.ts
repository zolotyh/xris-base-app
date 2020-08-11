import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserInfoXris } from 'app/shared/model/user-info-xris.model';
import { UserInfoXrisService } from './user-info-xris.service';
import { UserInfoXrisDeleteDialogComponent } from './user-info-xris-delete-dialog.component';

@Component({
  selector: 'jhi-user-info-xris',
  templateUrl: './user-info-xris.component.html',
})
export class UserInfoXrisComponent implements OnInit, OnDestroy {
  userInfos?: IUserInfoXris[];
  eventSubscriber?: Subscription;

  constructor(protected userInfoService: UserInfoXrisService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.userInfoService.query().subscribe((res: HttpResponse<IUserInfoXris[]>) => (this.userInfos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserInfos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserInfoXris): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserInfos(): void {
    this.eventSubscriber = this.eventManager.subscribe('userInfoListModification', () => this.loadAll());
  }

  delete(userInfo: IUserInfoXris): void {
    const modalRef = this.modalService.open(UserInfoXrisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userInfo = userInfo;
  }
}
