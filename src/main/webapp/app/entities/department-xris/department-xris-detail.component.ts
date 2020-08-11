import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartmentXris } from 'app/shared/model/department-xris.model';

@Component({
  selector: 'jhi-department-xris-detail',
  templateUrl: './department-xris-detail.component.html',
})
export class DepartmentXrisDetailComponent implements OnInit {
  department: IDepartmentXris | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => (this.department = department));
  }

  previousState(): void {
    window.history.back();
  }
}
