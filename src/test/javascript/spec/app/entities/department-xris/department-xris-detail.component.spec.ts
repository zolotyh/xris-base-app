import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { DepartmentXrisDetailComponent } from 'app/entities/department-xris/department-xris-detail.component';
import { DepartmentXris } from 'app/shared/model/department-xris.model';

describe('Component Tests', () => {
  describe('DepartmentXris Management Detail Component', () => {
    let comp: DepartmentXrisDetailComponent;
    let fixture: ComponentFixture<DepartmentXrisDetailComponent>;
    const route = ({ data: of({ department: new DepartmentXris(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [DepartmentXrisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DepartmentXrisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartmentXrisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load department on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.department).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
