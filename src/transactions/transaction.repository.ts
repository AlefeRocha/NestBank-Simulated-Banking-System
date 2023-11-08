import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { BaseRepository } from '../common/repositories/base.repository'
import { Transaction } from './transaction.entity'

@Injectable()
export class TransactionsRepository extends BaseRepository {
  constructor(protected readonly httpService: HttpService) {
    super(httpService)
  }

  private DEPOSIT = `
    mutation Deposit($account_id: uuid, $value: numeric) {
        insert_transaction(objects: {account_id: $account_id, value: $value}) {
            returning {
                account_id
                id
                value
            }
        }
    }
    `

  private WITHDRAW = `
    mutation Withdraw($account_id: uuid, $value: numeric) {
        insert_transaction(objects: {account_id: $account_id, value: $value}) {
            returning {
                account_id
                id
                value
            }
        }
    }
    `

  private BALANCE = `
    query Balance($account_id: uuid) {
        transaction_aggregate(where: {account_id: {_eq: $account_id}}) {
          aggregate {
            sum {
              value
            }
          }
        }
    }
    `

  private TRANSACTIONS = `
    query Transactions($id: uuid) {
        transaction(where: {account_id: {_eq: $id}}) {
            id
            value
        }
    }
    `

  private NAME = `
    query Name($id: uuid) {
      account(where: {id: {_eq: $id}}) {
        name
      }
    }
    `

  private ACCOUNTS = `
    query Accounts {
      account {
        id
      }
    }
    `

  async deposit(account_id: string, value: number): Promise<void> {
    await super.fetchGraphQL({ body: { query: this.DEPOSIT, variables: { account_id, value } } })
  }

  async withdraw(account_id: string, value: number): Promise<void> {
    await super.fetchGraphQL({ body: { query: this.WITHDRAW, variables: { account_id, value: -value } } })
  }

  async balance(account_id: string): Promise<number> {
    const { data } = await super.fetchGraphQL({ body: { query: this.BALANCE, variables: { account_id } } })
    return data.transaction_aggregate.aggregate.sum.value
  }

  async transactionsList(id: string): Promise<Transaction[]> {
    const { data } = await super.fetchGraphQL({ body: { query: this.TRANSACTIONS, variables: { id } } })
    return data.transaction
  }

  async getName(id: string): Promise<string> {
    const { data } = await super.fetchGraphQL({ body: { query: this.NAME, variables: { id } } })
    return data.account[0].name
  }

  async getAccounts(): Promise<any> {
    const { data } = await super.fetchGraphQL({ body: { query: this.ACCOUNTS } })
    return data.account
  }
}
