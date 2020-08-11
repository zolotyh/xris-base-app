import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { XrisTestModule } from '../../../test.module';
import { DiscountXrisComponent } from 'app/entities/discount-xris/discount-xris.component';
import { DiscountXrisService } from 'app/entities/discount-xris/discount-xris.service';
import { DiscountXris } from 'app/shared/model/discount-xris.model';

describe('Component Tests', () => {
  describe('DiscountXris Management Component', () => {
    let comp: DiscountXrisComponent;
    let fixture: ComponentFixture<DiscountXrisComponent>;
    let service: DiscountXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [DiscountXrisComponent],
      })
        .overrideTemplate(DiscountXrisComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiscountXrisComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiscountXrisService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DiscountXris(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.discounts && comp.discounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
