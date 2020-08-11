import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { DiscountXrisUpdateComponent } from 'app/entities/discount-xris/discount-xris-update.component';
import { DiscountXrisService } from 'app/entities/discount-xris/discount-xris.service';
import { DiscountXris } from 'app/shared/model/discount-xris.model';

describe('Component Tests', () => {
  describe('DiscountXris Management Update Component', () => {
    let comp: DiscountXrisUpdateComponent;
    let fixture: ComponentFixture<DiscountXrisUpdateComponent>;
    let service: DiscountXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [DiscountXrisUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiscountXrisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiscountXrisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiscountXrisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DiscountXris(123);
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
        const entity = new DiscountXris();
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
