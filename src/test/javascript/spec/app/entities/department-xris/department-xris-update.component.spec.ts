import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { DepartmentXrisUpdateComponent } from 'app/entities/department-xris/department-xris-update.component';
import { DepartmentXrisService } from 'app/entities/department-xris/department-xris.service';
import { DepartmentXris } from 'app/shared/model/department-xris.model';

describe('Component Tests', () => {
  describe('DepartmentXris Management Update Component', () => {
    let comp: DepartmentXrisUpdateComponent;
    let fixture: ComponentFixture<DepartmentXrisUpdateComponent>;
    let service: DepartmentXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [DepartmentXrisUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DepartmentXrisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentXrisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentXrisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DepartmentXris(123);
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
        const entity = new DepartmentXris();
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
