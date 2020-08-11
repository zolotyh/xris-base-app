import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartmentXris } from 'app/shared/model/department-xris.model';
import { DepartmentXrisService } from './department-xris.service';

@Component({
  templateUrl: './department-xris-delete-dialog.component.html',
})
export class DepartmentXrisDeleteDialogComponent {
  department?: IDepartmentXris;

  constructor(
    protected departmentService: DepartmentXrisService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.departmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('departmentListModification');
      this.activeModal.close();
    });
  }
}
