import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { CustomerXrisUpdateComponent } from 'app/entities/customer-xris/customer-xris-update.component';
import { CustomerXrisService } from 'app/entities/customer-xris/customer-xris.service';
import { CustomerXris } from 'app/shared/model/customer-xris.model';

describe('Component Tests', () => {
  describe('CustomerXris Management Update Component', () => {
    let comp: CustomerXrisUpdateComponent;
    let fixture: ComponentFixture<CustomerXrisUpdateComponent>;
    let service: CustomerXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [CustomerXrisUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomerXrisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerXrisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerXrisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerXris(123);
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
        const entity = new CustomerXris();
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
