import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { GoodsXrisUpdateComponent } from 'app/entities/goods-xris/goods-xris-update.component';
import { GoodsXrisService } from 'app/entities/goods-xris/goods-xris.service';
import { GoodsXris } from 'app/shared/model/goods-xris.model';

describe('Component Tests', () => {
  describe('GoodsXris Management Update Component', () => {
    let comp: GoodsXrisUpdateComponent;
    let fixture: ComponentFixture<GoodsXrisUpdateComponent>;
    let service: GoodsXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [GoodsXrisUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GoodsXrisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GoodsXrisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GoodsXrisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GoodsXris(123);
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
        const entity = new GoodsXris();
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
