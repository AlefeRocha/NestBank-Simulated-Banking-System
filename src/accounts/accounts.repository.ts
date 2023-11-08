import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { BaseRepository } from '../common/repositories/base.repository'
import { Account } from './accounts.entity'

@Injectable()
export class AccountsRepository extends BaseRepository {
  constructor(protected readonly httpService: HttpService) {
    super(httpService)
  }

  private CREATE_ACCOUNT = `
    mutation CreateAccount($name: String, $email: String) {
      insert_account(objects: {name: $name, email: $email}) {
        returning {
          id
          name
          email
        }
      }
    }
    `

  private DELETE_ACCOUNT = `
    mutation DeleteAccount($id: uuid) {
      delete_account(where: {id: {_eq: $id}}) {
        returning {
          id
          name
          email
        }
      }
    }
    `

  private SEARCH_BY_ID = `
    query AccountById($id: uuid) {
      account(where: {id: {_eq: $id}}) {
        id
        name
        email
      }
    }
  `

  private LIST_ACCOUNTS = `
    query ListAccounts {
      account {
        id
        name
        email
      }
    }
  `

  private SEARCH_EMAIL = `
    query SearchEmail($email: String) {
      account(where: {email: {_eq: $email}}) {
        email
      }
    }
  `

  private VALIDATE = `
    query Validate($id: uuid) {
      account(where: {id: {_eq: $id}}) {
        id
      }
    }
  `

  async create(name: String, email: String): Promise<any> {
    const { data } = await super.fetchGraphQL({ body: { query: this.CREATE_ACCOUNT, variables: { name, email } } })
    return data.insert_account.returning.pop()
  }

  async delete(id: string): Promise<void> {
    await super.fetchGraphQL({ body: { query: this.DELETE_ACCOUNT, variables: { id } } })
  }

  async searchById(id: string): Promise<Account> {
    const { data } = await super.fetchGraphQL({ body: { query: this.SEARCH_BY_ID, variables: { id } } })
    return data.account.pop()
  }

  async list(): Promise<Account[]> {
    const { data } = await super.fetchGraphQL({ body: { query: this.LIST_ACCOUNTS } })
    return data.account
  }

  async emailExists(email: string): Promise<boolean> {
    const { data } = await super.fetchGraphQL({ body: { query: this.SEARCH_EMAIL, variables: { email } } })
    return data.account.some((account: Account) => account.email === email) ? true : false
  }

  async validate(id: string): Promise<boolean> {
    const { data } = await super.fetchGraphQL({ body: { query: this.VALIDATE, variables: { id } } })
    return data === undefined || data.account.length === 0 ? false : true
  }
}
