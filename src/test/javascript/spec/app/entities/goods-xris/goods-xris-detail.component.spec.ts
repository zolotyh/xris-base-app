import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { GoodsXrisDetailComponent } from 'app/entities/goods-xris/goods-xris-detail.component';
import { GoodsXris } from 'app/shared/model/goods-xris.model';

describe('Component Tests', () => {
  describe('GoodsXris Management Detail Component', () => {
    let comp: GoodsXrisDetailComponent;
    let fixture: ComponentFixture<GoodsXrisDetailComponent>;
    const route = ({ data: of({ goods: new GoodsXris(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [GoodsXrisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GoodsXrisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GoodsXrisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load goods on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.goods).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
