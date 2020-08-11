import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { XrisTestModule } from '../../../test.module';
import { TransactionRowXrisComponent } from 'app/entities/transaction-row-xris/transaction-row-xris.component';
import { TransactionRowXrisService } from 'app/entities/transaction-row-xris/transaction-row-xris.service';
import { TransactionRowXris } from 'app/shared/model/transaction-row-xris.model';

describe('Component Tests', () => {
  describe('TransactionRowXris Management Component', () => {
    let comp: TransactionRowXrisComponent;
    let fixture: ComponentFixture<TransactionRowXrisComponent>;
    let service: TransactionRowXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [TransactionRowXrisComponent],
      })
        .overrideTemplate(TransactionRowXrisComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransactionRowXrisComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionRowXrisService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TransactionRowXris(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.transactionRows && comp.transactionRows[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
