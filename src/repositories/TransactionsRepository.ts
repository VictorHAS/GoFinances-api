import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    let balance = transactions.reduce(
      (acumulator, { type, value }) => ({
        ...acumulator,
        [type]: acumulator[type] + Number(value),
      }),
      { income: 0, outcome: 0, total: 0 },
    );

    balance = { ...balance, total: balance.income - balance.outcome };

    return balance;
  }
}

export default TransactionsRepository;
