import { IDepartmentXris } from 'app/shared/model/department-xris.model';
import { ITransactionXris } from 'app/shared/model/transaction-xris.model';

export interface IUserInfoXris {
  id?: number;
  email?: string;
  login?: string;
  departments?: IDepartmentXris[];
  transaction?: ITransactionXris;
}

export class UserInfoXris implements IUserInfoXris {
  constructor(
    public id?: number,
    public email?: string,
    public login?: string,
    public departments?: IDepartmentXris[],
    public transaction?: ITransactionXris
  ) {}
}
