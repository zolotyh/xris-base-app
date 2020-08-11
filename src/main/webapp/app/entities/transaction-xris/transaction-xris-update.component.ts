import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITransactionXris, TransactionXris } from 'app/shared/model/transaction-xris.model';
import { TransactionXrisService } from './transaction-xris.service';
import { IDepartmentXris } from 'app/shared/model/department-xris.model';
import { DepartmentXrisService } from 'app/entities/department-xris/department-xris.service';
import { ITransactionRowXris } from 'app/shared/model/transaction-row-xris.model';
import { TransactionRowXrisService } from 'app/entities/transaction-row-xris/transaction-row-xris.service';

type SelectableEntity = IDepartmentXris | ITransactionRowXris;

@Component({
  selector: 'jhi-transaction-xris-update',
  templateUrl: './transaction-xris-update.component.html',
})
export class TransactionXrisUpdateComponent implements OnInit {
  isSaving = false;
  departments: IDepartmentXris[] = [];
  transactionrows: ITransactionRowXris[] = [];

  editForm = this.fb.group({
    id: [],
    datetime: [],
    department: [],
    transactionRow: [],
  });

  constructor(
    protected transactionService: TransactionXrisService,
    protected departmentService: DepartmentXrisService,
    protected transactionRowService: TransactionRowXrisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transaction }) => {
      if (!transaction.id) {
        const today = moment().startOf('day');
        transaction.datetime = today;
      }

      this.updateForm(transaction);

      this.departmentService.query().subscribe((res: HttpResponse<IDepartmentXris[]>) => (this.departments = res.body || []));

      this.transactionRowService.query().subscribe((res: HttpResponse<ITransactionRowXris[]>) => (this.transactionrows = res.body || []));
    });
  }

  updateForm(transaction: ITransactionXris): void {
    this.editForm.patchValue({
      id: transaction.id,
      datetime: transaction.datetime ? transaction.datetime.format(DATE_TIME_FORMAT) : null,
      department: transaction.department,
      transactionRow: transaction.transactionRow,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transaction = this.createFromForm();
    if (transaction.id !== undefined) {
      this.subscribeToSaveResponse(this.transactionService.update(transaction));
    } else {
      this.subscribeToSaveResponse(this.transactionService.create(transaction));
    }
  }

  private createFromForm(): ITransactionXris {
    return {
      ...new TransactionXris(),
      id: this.editForm.get(['id'])!.value,
      datetime: this.editForm.get(['datetime'])!.value ? moment(this.editForm.get(['datetime'])!.value, DATE_TIME_FORMAT) : undefined,
      department: this.editForm.get(['department'])!.value,
      transactionRow: this.editForm.get(['transactionRow'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionXris>>): void {
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
