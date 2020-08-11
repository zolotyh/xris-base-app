import { ITransactionRowXris } from 'app/shared/model/transaction-row-xris.model';

export interface IDiscountXris {
  id?: number;
  value?: number;
  transactionRow?: ITransactionRowXris;
}

export class DiscountXris implements IDiscountXris {
  constructor(public id?: number, public value?: number, public transactionRow?: ITransactionRowXris) {}
}
