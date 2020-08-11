import { ITransactionXris } from 'app/shared/model/transaction-xris.model';

export interface IClientXris {
  id?: number;
  phoneNumber?: number;
  client?: ITransactionXris;
}

export class ClientXris implements IClientXris {
  constructor(public id?: number, public phoneNumber?: number, public client?: ITransactionXris) {}
}
