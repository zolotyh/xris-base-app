import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserInfoXris } from 'app/shared/model/user-info-xris.model';
import { UserInfoXrisService } from './user-info-xris.service';

@Component({
  templateUrl: './user-info-xris-delete-dialog.component.html',
})
export class UserInfoXrisDeleteDialogComponent {
  userInfo?: IUserInfoXris;

  constructor(
    protected userInfoService: UserInfoXrisService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userInfoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userInfoListModification');
      this.activeModal.close();
    });
  }
}
