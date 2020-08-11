import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICustomerXris, CustomerXris } from 'app/shared/model/customer-xris.model';
import { CustomerXrisService } from './customer-xris.service';
import { IClientXris } from 'app/shared/model/client-xris.model';
import { ClientXrisService } from 'app/entities/client-xris/client-xris.service';
import { IUserInfoXris } from 'app/shared/model/user-info-xris.model';
import { UserInfoXrisService } from 'app/entities/user-info-xris/user-info-xris.service';
import { IDepartmentXris } from 'app/shared/model/department-xris.model';
import { DepartmentXrisService } from 'app/entities/department-xris/department-xris.service';
import { IGoodsXris } from 'app/shared/model/goods-xris.model';
import { GoodsXrisService } from 'app/entities/goods-xris/goods-xris.service';

type SelectableEntity = IClientXris | IUserInfoXris | IDepartmentXris | IGoodsXris;

@Component({
  selector: 'jhi-customer-xris-update',
  templateUrl: './customer-xris-update.component.html',
})
export class CustomerXrisUpdateComponent implements OnInit {
  isSaving = false;
  clients: IClientXris[] = [];
  userinfos: IUserInfoXris[] = [];
  departments: IDepartmentXris[] = [];
  goods: IGoodsXris[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    client: [],
    userInfo: [],
    department: [],
    goods: [],
  });

  constructor(
    protected customerService: CustomerXrisService,
    protected clientService: ClientXrisService,
    protected userInfoService: UserInfoXrisService,
    protected departmentService: DepartmentXrisService,
    protected goodsService: GoodsXrisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.updateForm(customer);

      this.clientService.query().subscribe((res: HttpResponse<IClientXris[]>) => (this.clients = res.body || []));

      this.userInfoService.query().subscribe((res: HttpResponse<IUserInfoXris[]>) => (this.userinfos = res.body || []));

      this.departmentService.query().subscribe((res: HttpResponse<IDepartmentXris[]>) => (this.departments = res.body || []));

      this.goodsService.query().subscribe((res: HttpResponse<IGoodsXris[]>) => (this.goods = res.body || []));
    });
  }

  updateForm(customer: ICustomerXris): void {
    this.editForm.patchValue({
      id: customer.id,
      name: customer.name,
      client: customer.client,
      userInfo: customer.userInfo,
      department: customer.department,
      goods: customer.goods,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customer = this.createFromForm();
    if (customer.id !== undefined) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  private createFromForm(): ICustomerXris {
    return {
      ...new CustomerXris(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      client: this.editForm.get(['client'])!.value,
      userInfo: this.editForm.get(['userInfo'])!.value,
      department: this.editForm.get(['department'])!.value,
      goods: this.editForm.get(['goods'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerXris>>): void {
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
