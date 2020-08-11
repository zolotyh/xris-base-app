import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { TransactionXrisDetailComponent } from 'app/entities/transaction-xris/transaction-xris-detail.component';
import { TransactionXris } from 'app/shared/model/transaction-xris.model';

describe('Component Tests', () => {
  describe('TransactionXris Management Detail Component', () => {
    let comp: TransactionXrisDetailComponent;
    let fixture: ComponentFixture<TransactionXrisDetailComponent>;
    const route = ({ data: of({ transaction: new TransactionXris(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [TransactionXrisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TransactionXrisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransactionXrisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load transaction on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.transaction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
