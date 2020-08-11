import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { ClientXrisUpdateComponent } from 'app/entities/client-xris/client-xris-update.component';
import { ClientXrisService } from 'app/entities/client-xris/client-xris.service';
import { ClientXris } from 'app/shared/model/client-xris.model';

describe('Component Tests', () => {
  describe('ClientXris Management Update Component', () => {
    let comp: ClientXrisUpdateComponent;
    let fixture: ComponentFixture<ClientXrisUpdateComponent>;
    let service: ClientXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [ClientXrisUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ClientXrisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClientXrisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClientXrisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClientXris(123);
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
        const entity = new ClientXris();
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
