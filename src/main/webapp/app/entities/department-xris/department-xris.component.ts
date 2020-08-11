import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartmentXris } from 'app/shared/model/department-xris.model';
import { DepartmentXrisService } from './department-xris.service';
import { DepartmentXrisDeleteDialogComponent } from './department-xris-delete-dialog.component';

@Component({
  selector: 'jhi-department-xris',
  templateUrl: './department-xris.component.html',
})
export class DepartmentXrisComponent implements OnInit, OnDestroy {
  departments?: IDepartmentXris[];
  eventSubscriber?: Subscription;

  constructor(
    protected departmentService: DepartmentXrisService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.departmentService.query().subscribe((res: HttpResponse<IDepartmentXris[]>) => (this.departments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepartments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepartmentXris): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepartments(): void {
    this.eventSubscriber = this.eventManager.subscribe('departmentListModification', () => this.loadAll());
  }

  delete(department: IDepartmentXris): void {
    const modalRef = this.modalService.open(DepartmentXrisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.department = department;
  }
}
