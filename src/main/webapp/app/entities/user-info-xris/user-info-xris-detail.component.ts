import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserInfoXris } from 'app/shared/model/user-info-xris.model';

@Component({
  selector: 'jhi-user-info-xris-detail',
  templateUrl: './user-info-xris-detail.component.html',
})
export class UserInfoXrisDetailComponent implements OnInit {
  userInfo: IUserInfoXris | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userInfo }) => (this.userInfo = userInfo));
  }

  previousState(): void {
    window.history.back();
  }
}
