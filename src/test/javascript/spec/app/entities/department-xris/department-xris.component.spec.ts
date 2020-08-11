import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { XrisTestModule } from '../../../test.module';
import { DepartmentXrisComponent } from 'app/entities/department-xris/department-xris.component';
import { DepartmentXrisService } from 'app/entities/department-xris/department-xris.service';
import { DepartmentXris } from 'app/shared/model/department-xris.model';

describe('Component Tests', () => {
  describe('DepartmentXris Management Component', () => {
    let comp: DepartmentXrisComponent;
    let fixture: ComponentFixture<DepartmentXrisComponent>;
    let service: DepartmentXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [DepartmentXrisComponent],
      })
        .overrideTemplate(DepartmentXrisComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentXrisComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentXrisService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DepartmentXris(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.departments && comp.departments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
