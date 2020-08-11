import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { XrisTestModule } from '../../../test.module';
import { UserInfoXrisComponent } from 'app/entities/user-info-xris/user-info-xris.component';
import { UserInfoXrisService } from 'app/entities/user-info-xris/user-info-xris.service';
import { UserInfoXris } from 'app/shared/model/user-info-xris.model';

describe('Component Tests', () => {
  describe('UserInfoXris Management Component', () => {
    let comp: UserInfoXrisComponent;
    let fixture: ComponentFixture<UserInfoXrisComponent>;
    let service: UserInfoXrisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [XrisTestModule],
        declarations: [UserInfoXrisComponent],
      })
        .overrideTemplate(UserInfoXrisComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserInfoXrisComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserInfoXrisService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserInfoXris(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userInfos && comp.userInfos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
