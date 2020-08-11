import { ICustomerXris } from 'app/shared/model/customer-xris.model';
import { IPriceXris } from 'app/shared/model/price-xris.model';
import { ITransactionRowXris } from 'app/shared/model/transaction-row-xris.model';

export interface IGoodsXris {
  id?: number;
  name?: string;
  description?: string;
  customers?: ICustomerXris[];
  goods?: IPriceXris;
  transactionRow?: ITransactionRowXris;
}

export class GoodsXris implements IGoodsXris {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public customers?: ICustomerXris[],
    public goods?: IPriceXris,
    public transactionRow?: ITransactionRowXris
  ) {}
}
