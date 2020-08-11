import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { XrisTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { TransactionRowXrisDeleteDialogComponent } from 'app/entities/transaction-row-xris/transaction-row-xris-delete-dialog.component';
import { TransactionRowXrisService } from 'app/entities/transaction-row-xris/transaction-row-xris.service';

describe('Component Tests', () => {
  describe('TransactionRowXris Management Delete Component', () => {
    let comp: TransactionRowXrisDeleteDialogComponent;
    let fixture: ComponentFixture<TransactionRowXrisDeleteDialogComponent>;
    let service: TransactionRowXrisService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [TransactionRowXrisDeleteDialogComponent],
      })
        .overrideTemplate(TransactionRowXrisDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransactionRowXrisDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionRowXrisService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
