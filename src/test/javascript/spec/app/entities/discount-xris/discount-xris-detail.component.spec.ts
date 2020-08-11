import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { DiscountXrisDetailComponent } from 'app/entities/discount-xris/discount-xris-detail.component';
import { DiscountXris } from 'app/shared/model/discount-xris.model';

describe('Component Tests', () => {
  describe('DiscountXris Management Detail Component', () => {
    let comp: DiscountXrisDetailComponent;
    let fixture: ComponentFixture<DiscountXrisDetailComponent>;
    const route = ({ data: of({ discount: new DiscountXris(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [DiscountXrisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiscountXrisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiscountXrisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load discount on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.discount).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
