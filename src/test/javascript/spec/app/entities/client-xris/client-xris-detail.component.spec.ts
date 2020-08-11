import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { ClientXrisDetailComponent } from 'app/entities/client-xris/client-xris-detail.component';
import { ClientXris } from 'app/shared/model/client-xris.model';

describe('Component Tests', () => {
  describe('ClientXris Management Detail Component', () => {
    let comp: ClientXrisDetailComponent;
    let fixture: ComponentFixture<ClientXrisDetailComponent>;
    const route = ({ data: of({ client: new ClientXris(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [ClientXrisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ClientXrisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClientXrisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load client on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.client).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
