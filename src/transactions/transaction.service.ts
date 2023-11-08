import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { AccountsRepository } from '../accounts/accounts.repository'
import { Transaction } from './transaction.entity'
import { TransactionsRepository } from './transaction.repository'

@Injectable()
export class TransactionsService {
  constructor(private transactionRepository: TransactionsRepository, private accountsRepository: AccountsRepository) {}

  async deposit(id: string, value: number): Promise<number> {
    if (!(await this.isNotValid(id))) {
      throw new NotFoundException('Account not found')
    }
    if (value <= 0) {
      throw new BadRequestException('Invalid value')
    }
    await this.transactionRepository.deposit(id, value)
    return await this.transactionRepository.balance(id)
  }

  async withdraw(id: string, value: number): Promise<number | any> {
    const result = await this.isNotValid(id)
    if (!result) {
      throw new NotFoundException('Account not found')
    }

    if (value < 0) {
      value = value * -1
    } else if (value === 0) {
      throw new BadRequestException('Invalid value')
    }

    const balance = await this.transactionRepository.balance(id)
    const balanceSubtraction = balance - value
    if (balanceSubtraction < -100) {
      return {
        message: 'Unprocessable Entity',
      }
    }

    await this.transactionRepository.withdraw(id, value)
    return balanceSubtraction
  }

  async balance(id: string): Promise<number> {
    const result = await this.isNotValid(id)
    if (!result) {
      throw new NotFoundException('Account not found')
    }
    return await this.transactionRepository.balance(id)
  }

  async transactionsList(id: string): Promise<Transaction[]> {
    const result = await this.isNotValid(id)
    if (!result) {
      throw new NotFoundException('Account not found')
    }
    return await this.transactionRepository.transactionsList(id)
  }

  async getName(id: string): Promise<string> {
    return await this.transactionRepository.getName(id)
  }

  async isWithdrawTransaction(value: number): Promise<boolean> {
    return value < 0
  }

  async getAccounts(): Promise<any> {
    return await this.transactionRepository.getAccounts()
  }

  async isNotValid(id: string): Promise<boolean> {
    return !(await this.accountsRepository.validate(id)) ? false : true
  }
}
