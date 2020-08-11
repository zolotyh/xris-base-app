import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { CustomerXrisDetailComponent } from 'app/entities/customer-xris/customer-xris-detail.component';
import { CustomerXris } from 'app/shared/model/customer-xris.model';

describe('Component Tests', () => {
  describe('CustomerXris Management Detail Component', () => {
    let comp: CustomerXrisDetailComponent;
    let fixture: ComponentFixture<CustomerXrisDetailComponent>;
    const route = ({ data: of({ customer: new CustomerXris(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [CustomerXrisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerXrisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerXrisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
