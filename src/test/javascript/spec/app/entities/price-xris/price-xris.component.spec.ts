import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { XrisTestModule } from '../../../test.module';
import { PriceXrisComponent } from 'app/entities/price-xris/price-xris.component';
import { PriceXrisService } from 'app/entities/price-xris/price-xris.service';
import { PriceXris } from 'app/shared/model/price-xris.model';

describe('Component Tests', () => {
  describe('PriceXris Management Component', () => {
    let comp: PriceXrisComponent;
    let fixture: ComponentFixture<PriceXrisComponent>;
    let service: PriceXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [PriceXrisComponent],
      })
        .overrideTemplate(PriceXrisComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PriceXrisComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PriceXrisService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PriceXris(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.prices && comp.prices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
