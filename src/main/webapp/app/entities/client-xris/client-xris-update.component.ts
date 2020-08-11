import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IClientXris, ClientXris } from 'app/shared/model/client-xris.model';
import { ClientXrisService } from './client-xris.service';
import { ITransactionXris } from 'app/shared/model/transaction-xris.model';
import { TransactionXrisService } from 'app/entities/transaction-xris/transaction-xris.service';

@Component({
  selector: 'jhi-client-xris-update',
  templateUrl: './client-xris-update.component.html',
})
export class ClientXrisUpdateComponent implements OnInit {
  isSaving = false;
  transactions: ITransactionXris[] = [];

  editForm = this.fb.group({
    id: [],
    phoneNumber: [],
    client: [],
  });

  constructor(
    protected clientService: ClientXrisService,
    protected transactionService: TransactionXrisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);

      this.transactionService.query().subscribe((res: HttpResponse<ITransactionXris[]>) => (this.transactions = res.body || []));
    });
  }

  updateForm(client: IClientXris): void {
    this.editForm.patchValue({
      id: client.id,
      phoneNumber: client.phoneNumber,
      client: client.client,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  private createFromForm(): IClientXris {
    return {
      ...new ClientXris(),
      id: this.editForm.get(['id'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      client: this.editForm.get(['client'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClientXris>>): void {
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

  trackById(index: number, item: ITransactionXris): any {
    return item.id;
  }
}
