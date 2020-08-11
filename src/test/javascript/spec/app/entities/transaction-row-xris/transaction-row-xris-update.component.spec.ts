import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { TransactionRowXrisUpdateComponent } from 'app/entities/transaction-row-xris/transaction-row-xris-update.component';
import { TransactionRowXrisService } from 'app/entities/transaction-row-xris/transaction-row-xris.service';
import { TransactionRowXris } from 'app/shared/model/transaction-row-xris.model';

describe('Component Tests', () => {
  describe('TransactionRowXris Management Update Component', () => {
    let comp: TransactionRowXrisUpdateComponent;
    let fixture: ComponentFixture<TransactionRowXrisUpdateComponent>;
    let service: TransactionRowXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [TransactionRowXrisUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TransactionRowXrisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransactionRowXrisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionRowXrisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TransactionRowXris(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TransactionRowXris();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
