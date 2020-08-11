import { Moment } from 'moment';
import { IUserInfoXris } from 'app/shared/model/user-info-xris.model';
import { IDepartmentXris } from 'app/shared/model/department-xris.model';
import { ITransactionRowXris } from 'app/shared/model/transaction-row-xris.model';

export interface ITransactionXris {
  id?: number;
  datetime?: Moment;
  userInfos?: IUserInfoXris[];
  department?: IDepartmentXris;
  transactionRow?: ITransactionRowXris;
}

export class TransactionXris implements ITransactionXris {
  constructor(
    public id?: number,
    public datetime?: Moment,
    public userInfos?: IUserInfoXris[],
    public department?: IDepartmentXris,
    public transactionRow?: ITransactionRowXris
  ) {}
}
