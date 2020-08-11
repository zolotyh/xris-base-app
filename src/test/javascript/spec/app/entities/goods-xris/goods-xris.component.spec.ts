import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { XrisTestModule } from '../../../test.module';
import { GoodsXrisComponent } from 'app/entities/goods-xris/goods-xris.component';
import { GoodsXrisService } from 'app/entities/goods-xris/goods-xris.service';
import { GoodsXris } from 'app/shared/model/goods-xris.model';

describe('Component Tests', () => {
  describe('GoodsXris Management Component', () => {
    let comp: GoodsXrisComponent;
    let fixture: ComponentFixture<GoodsXrisComponent>;
    let service: GoodsXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [GoodsXrisComponent],
      })
        .overrideTemplate(GoodsXrisComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GoodsXrisComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GoodsXrisService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GoodsXris(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.goods && comp.goods[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
