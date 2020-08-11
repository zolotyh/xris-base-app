import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserInfoXris, UserInfoXris } from 'app/shared/model/user-info-xris.model';
import { UserInfoXrisService } from './user-info-xris.service';
import { IDepartmentXris } from 'app/shared/model/department-xris.model';
import { DepartmentXrisService } from 'app/entities/department-xris/department-xris.service';
import { ITransactionXris } from 'app/shared/model/transaction-xris.model';
import { TransactionXrisService } from 'app/entities/transaction-xris/transaction-xris.service';

type SelectableEntity = IDepartmentXris | ITransactionXris;

@Component({
  selector: 'jhi-user-info-xris-update',
  templateUrl: './user-info-xris-update.component.html',
})
export class UserInfoXrisUpdateComponent implements OnInit {
  isSaving = false;
  departments: IDepartmentXris[] = [];
  transactions: ITransactionXris[] = [];

  editForm = this.fb.group({
    id: [],
    email: [],
    login: [],
    departments: [],
    transaction: [],
  });

  constructor(
    protected userInfoService: UserInfoXrisService,
    protected departmentService: DepartmentXrisService,
    protected transactionService: TransactionXrisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userInfo }) => {
      this.updateForm(userInfo);

      this.departmentService.query().subscribe((res: HttpResponse<IDepartmentXris[]>) => (this.departments = res.body || []));

      this.transactionService.query().subscribe((res: HttpResponse<ITransactionXris[]>) => (this.transactions = res.body || []));
    });
  }

  updateForm(userInfo: IUserInfoXris): void {
    this.editForm.patchValue({
      id: userInfo.id,
      email: userInfo.email,
      login: userInfo.login,
      departments: userInfo.departments,
      transaction: userInfo.transaction,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userInfo = this.createFromForm();
    if (userInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.userInfoService.update(userInfo));
    } else {
      this.subscribeToSaveResponse(this.userInfoService.create(userInfo));
    }
  }

  private createFromForm(): IUserInfoXris {
    return {
      ...new UserInfoXris(),
      id: this.editForm.get(['id'])!.value,
      email: this.editForm.get(['email'])!.value,
      login: this.editForm.get(['login'])!.value,
      departments: this.editForm.get(['departments'])!.value,
      transaction: this.editForm.get(['transaction'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserInfoXris>>): void {
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

  getSelected(selectedVals: IDepartmentXris[], option: IDepartmentXris): IDepartmentXris {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
