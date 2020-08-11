import { IGoodsXris } from 'app/shared/model/goods-xris.model';
import { IPriceXris } from 'app/shared/model/price-xris.model';
import { IDiscountXris } from 'app/shared/model/discount-xris.model';

export interface ITransactionRowXris {
  id?: number;
  goods?: IGoodsXris;
  price?: IPriceXris;
  discount?: IDiscountXris;
}

export class TransactionRowXris implements ITransactionRowXris {
  constructor(public id?: number, public goods?: IGoodsXris, public price?: IPriceXris, public discount?: IDiscountXris) {}
}
