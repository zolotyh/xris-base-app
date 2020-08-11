import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { UserInfoXrisUpdateComponent } from 'app/entities/user-info-xris/user-info-xris-update.component';
import { UserInfoXrisService } from 'app/entities/user-info-xris/user-info-xris.service';
import { UserInfoXris } from 'app/shared/model/user-info-xris.model';

describe('Component Tests', () => {
  describe('UserInfoXris Management Update Component', () => {
    let comp: UserInfoXrisUpdateComponent;
    let fixture: ComponentFixture<UserInfoXrisUpdateComponent>;
    let service: UserInfoXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [UserInfoXrisUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UserInfoXrisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserInfoXrisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserInfoXrisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserInfoXris(123);
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
        const entity = new UserInfoXris();
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
