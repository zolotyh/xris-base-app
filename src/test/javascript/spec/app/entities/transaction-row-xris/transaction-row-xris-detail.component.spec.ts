import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { TransactionRowXrisDetailComponent } from 'app/entities/transaction-row-xris/transaction-row-xris-detail.component';
import { TransactionRowXris } from 'app/shared/model/transaction-row-xris.model';

describe('Component Tests', () => {
  describe('TransactionRowXris Management Detail Component', () => {
    let comp: TransactionRowXrisDetailComponent;
    let fixture: ComponentFixture<TransactionRowXrisDetailComponent>;
    const route = ({ data: of({ transactionRow: new TransactionRowXris(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [TransactionRowXrisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TransactionRowXrisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransactionRowXrisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load transactionRow on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.transactionRow).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
