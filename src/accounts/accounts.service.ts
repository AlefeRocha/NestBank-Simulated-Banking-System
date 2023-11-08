import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Account } from './accounts.entity'
import { AccountsRepository } from './accounts.repository'

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async create(name: string, email: string): Promise<any> {
    const result = await this.emailExists(email)
    if (result) {
      throw new BadRequestException('Email already exists')
    }
    const account = await this.accountsRepository.create(name, email)
    return {
      message: 'created account',
      account: account,
    }
  }

  async delete(id: string): Promise<any> {
    const account = await this.accountsRepository.searchById(id)
    const result = await this.validate(id)
    if (!result) {
      throw new NotFoundException('Account not found')
    }
    await this.accountsRepository.delete(id)
    return {
      message: 'deleted account',
      account,
    }
  }

  async list(): Promise<Account[]> {
    return await this.accountsRepository.list()
  }

  async getAccountById(id: string): Promise<Account> {
    const result = await this.validate(id)
    if (!result) {
      throw new NotFoundException('Account not found')
    }
    return this.accountsRepository.searchById(id)
  }

  async emailExists(email: string): Promise<boolean> {
    return (await this.accountsRepository.emailExists(email)) ? true : false
  }

  async validate(id: string): Promise<boolean> {
    return (await this.accountsRepository.validate(id)) ? true : false
  }
}
