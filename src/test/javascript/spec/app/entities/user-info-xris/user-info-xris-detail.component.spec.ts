import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { XrisTestModule } from '../../../test.module';
import { UserInfoXrisDetailComponent } from 'app/entities/user-info-xris/user-info-xris-detail.component';
import { UserInfoXris } from 'app/shared/model/user-info-xris.model';

describe('Component Tests', () => {
  describe('UserInfoXris Management Detail Component', () => {
    let comp: UserInfoXrisDetailComponent;
    let fixture: ComponentFixture<UserInfoXrisDetailComponent>;
    const route = ({ data: of({ userInfo: new UserInfoXris(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [UserInfoXrisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserInfoXrisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserInfoXrisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userInfo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userInfo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
