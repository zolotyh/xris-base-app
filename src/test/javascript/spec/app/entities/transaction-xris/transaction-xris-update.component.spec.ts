import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { TransactionXrisUpdateComponent } from 'app/entities/transaction-xris/transaction-xris-update.component';
import { TransactionXrisService } from 'app/entities/transaction-xris/transaction-xris.service';
import { TransactionXris } from 'app/shared/model/transaction-xris.model';

describe('Component Tests', () => {
  describe('TransactionXris Management Update Component', () => {
    let comp: TransactionXrisUpdateComponent;
    let fixture: ComponentFixture<TransactionXrisUpdateComponent>;
    let service: TransactionXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [TransactionXrisUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TransactionXrisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransactionXrisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionXrisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TransactionXris(123);
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
        const entity = new TransactionXris();
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
