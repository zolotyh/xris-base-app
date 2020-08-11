import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { PriceXrisDetailComponent } from 'app/entities/price-xris/price-xris-detail.component';
import { PriceXris } from 'app/shared/model/price-xris.model';

describe('Component Tests', () => {
  describe('PriceXris Management Detail Component', () => {
    let comp: PriceXrisDetailComponent;
    let fixture: ComponentFixture<PriceXrisDetailComponent>;
    const route = ({ data: of({ price: new PriceXris(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [PriceXrisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PriceXrisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PriceXrisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load price on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.price).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
