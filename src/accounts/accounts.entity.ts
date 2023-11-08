import { Transaction } from '../transactions/transaction.entity'

export class Account {
  id: string
  name: string
  email: string
  transactions: Transaction[] = []

  constructor(partial: Partial<Account>) {
    Object.assign(this, partial)
  }
}
