import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDepartmentXris, DepartmentXris } from 'app/shared/model/department-xris.model';
import { DepartmentXrisService } from './department-xris.service';
import { IPriceXris } from 'app/shared/model/price-xris.model';
import { PriceXrisService } from 'app/entities/price-xris/price-xris.service';

@Component({
  selector: 'jhi-department-xris-update',
  templateUrl: './department-xris-update.component.html',
})
export class DepartmentXrisUpdateComponent implements OnInit {
  isSaving = false;
  prices: IPriceXris[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    prices: [],
  });

  constructor(
    protected departmentService: DepartmentXrisService,
    protected priceService: PriceXrisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.updateForm(department);

      this.priceService.query().subscribe((res: HttpResponse<IPriceXris[]>) => (this.prices = res.body || []));
    });
  }

  updateForm(department: IDepartmentXris): void {
    this.editForm.patchValue({
      id: department.id,
      name: department.name,
      prices: department.prices,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const department = this.createFromForm();
    if (department.id !== undefined) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  private createFromForm(): IDepartmentXris {
    return {
      ...new DepartmentXris(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      prices: this.editForm.get(['prices'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentXris>>): void {
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

  trackById(index: number, item: IPriceXris): any {
    return item.id;
  }

  getSelected(selectedVals: IPriceXris[], option: IPriceXris): IPriceXris {
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
