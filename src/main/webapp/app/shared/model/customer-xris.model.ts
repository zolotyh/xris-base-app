import { IClientXris } from 'app/shared/model/client-xris.model';
import { IUserInfoXris } from 'app/shared/model/user-info-xris.model';
import { IDepartmentXris } from 'app/shared/model/department-xris.model';
import { IGoodsXris } from 'app/shared/model/goods-xris.model';

export interface ICustomerXris {
  id?: number;
  name?: string;
  client?: IClientXris;
  userInfo?: IUserInfoXris;
  department?: IDepartmentXris;
  goods?: IGoodsXris;
}

export class CustomerXris implements ICustomerXris {
  constructor(
    public id?: number,
    public name?: string,
    public client?: IClientXris,
    public userInfo?: IUserInfoXris,
    public department?: IDepartmentXris,
    public goods?: IGoodsXris
  ) {}
}
