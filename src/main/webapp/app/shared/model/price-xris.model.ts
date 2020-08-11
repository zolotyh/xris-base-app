import { IDiscountXris } from 'app/shared/model/discount-xris.model';
import { ITransactionRowXris } from 'app/shared/model/transaction-row-xris.model';
import { IDepartmentXris } from 'app/shared/model/department-xris.model';

export interface IPriceXris {
  id?: number;
  value?: number;
  price?: IDiscountXris;
  transactionRow?: ITransactionRowXris;
  departments?: IDepartmentXris[];
}

export class PriceXris implements IPriceXris {
  constructor(
    public id?: number,
    public value?: number,
    public price?: IDiscountXris,
    public transactionRow?: ITransactionRowXris,
    public departments?: IDepartmentXris[]
  ) {}
}
