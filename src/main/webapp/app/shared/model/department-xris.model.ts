import { IPriceXris } from 'app/shared/model/price-xris.model';
import { IUserInfoXris } from 'app/shared/model/user-info-xris.model';

export interface IDepartmentXris {
  id?: number;
  name?: string;
  prices?: IPriceXris[];
  userInfos?: IUserInfoXris[];
}

export class DepartmentXris implements IDepartmentXris {
  constructor(public id?: number, public name?: string, public prices?: IPriceXris[], public userInfos?: IUserInfoXris[]) {}
}
