import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { PriceXrisUpdateComponent } from 'app/entities/price-xris/price-xris-update.component';
import { PriceXrisService } from 'app/entities/price-xris/price-xris.service';
import { PriceXris } from 'app/shared/model/price-xris.model';

describe('Component Tests', () => {
  describe('PriceXris Management Update Component', () => {
    let comp: PriceXrisUpdateComponent;
    let fixture: ComponentFixture<PriceXrisUpdateComponent>;
    let service: PriceXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [PriceXrisUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PriceXrisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PriceXrisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PriceXrisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PriceXris(123);
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
        const entity = new PriceXris();
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
