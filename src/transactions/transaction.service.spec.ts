import { TestBed } from '@automock/jest'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { AccountsRepository } from '../accounts/accounts.repository'
import { Transaction } from './transaction.entity'
import { TransactionsRepository } from './transaction.repository'
import { TransactionsService } from './transaction.service'

describe('TransactionService', () => {
  let transactionsService: TransactionsService
  let transactionsRepository: jest.Mocked<TransactionsRepository>
  let accountsRepository: jest.Mocked<AccountsRepository>

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(TransactionsService).compile()
    transactionsService = unit
    transactionsRepository = unitRef.get(TransactionsRepository)
    accountsRepository = unitRef.get(AccountsRepository)
  })

  describe('#deposit', () => {
    let deposit: number = 200

    it('returns the balance', async () => {
      // prepara o cenário - setup
      // executa o método a ser testado - act
      // verifica o resultado - verify
      accountsRepository.validate.mockResolvedValue(true)
      transactionsRepository.balance.mockResolvedValue(deposit)

      const balance = await transactionsService.deposit('0eced2fb-bd15-495d-bf18-885bfcf0d2e8', deposit)

      expect(balance).toEqual(200)
    })

    it('throws an error when value is negative', async () => {
      let deposit = -200
      accountsRepository.validate.mockResolvedValue(true)

      await expect(transactionsService.deposit('0eced2fb-bd15-495d-bf18-885bfcf0d2e8', deposit)).rejects.toThrow(
        BadRequestException,
      )
    })

    it('throws an error when account not found', async () => {
      accountsRepository.validate.mockResolvedValue(false)

      await expect(transactionsService.deposit('0eced2fb-bd15-495d-bf18-885bfcf0d2e9', deposit)).rejects.toThrow(
        NotFoundException,
      )
      await expect(transactionsService.deposit('0eced2fb-bd15-495d-bf18-885bfcf0d2e9', deposit)).rejects.toThrow(
        'Account not found',
      )
    })
  })

  describe('#withdraw', () => {
    it('returns a withdraw with a positive number', async () => {
      const balance: number = 500
      let withdraw: number = 200
      accountsRepository.validate.mockResolvedValue(true)
      transactionsRepository.balance.mockResolvedValue(balance)

      const balanceSubtraction = balance - withdraw
      expect(await transactionsService.withdraw('0eced2fb-bd15-495d-bf18-885bfcf0d2e8', withdraw)).toEqual(
        balanceSubtraction,
      )
    })

    it('returns a withdraw with a negative number', async () => {
      const balance: number = 500
      let withdraw: number = -200
      accountsRepository.validate.mockResolvedValue(true)
      transactionsRepository.balance.mockResolvedValue(balance)
      transactionsRepository.withdraw.mockResolvedValue() // withdraw

      withdraw = withdraw * -1
      const balanceSubtraction = balance - withdraw
      expect(await transactionsService.withdraw('0eced2fb-bd15-495d-bf18-885bfcf0d2e8', withdraw)).toEqual(
        balanceSubtraction,
      )
    })

    it('throws an error when the value is 0', async () => {
      let withdraw = 0
      accountsRepository.validate.mockResolvedValue(true)

      await expect(transactionsService.withdraw('0eced2fb-bd15-495d-bf18-885bfcf0d2e8', withdraw)).rejects.toThrow(
        BadRequestException,
      )
      await expect(transactionsService.withdraw('0eced2fb-bd15-495d-bf18-885bfcf0d2e8', withdraw)).rejects.toThrow(
        'Invalid value',
      )
    })

    it('throws an error when account not found', async () => {
      accountsRepository.validate.mockResolvedValue(false)

      await expect(transactionsService.withdraw('0eced2fb-bd15-495d-bf18-885bfcf0d2e9', 200)).rejects.toThrow(
        NotFoundException,
      )
      await expect(transactionsService.withdraw('0eced2fb-bd15-495d-bf18-885bfcf0d2e9', 200)).rejects.toThrow(
        'Account not found',
      )
    })
  })

  describe('#balance', () => {
    it('returns a balance', async () => {
      const balance: number = 500
      accountsRepository.validate.mockResolvedValue(true)
      transactionsRepository.balance.mockResolvedValue(balance)

      expect(await transactionsService.balance('0eced2fb-bd15-495d-bf18-885bfcf0d2e8')).toEqual(balance)
    })

    it('throws an error when account not found', async () => {
      expect.assertions(2)
      accountsRepository.validate.mockResolvedValue(false)

      await expect(transactionsService.balance('0eced2fb-bd15-495d-bf18-885bfcf0d2e9')).rejects.toThrow(
        NotFoundException,
      )
      await expect(transactionsService.balance('0eced2fb-bd15-495d-bf18-885bfcf0d2e9')).rejects.toThrow(
        'Account not found',
      )
    })
  })

  describe('#transactionsList', () => {
    const transactions: Transaction[] = [
      {
        id: 1,
        value: 120,
        account_id: '0eced2fb-bd15-495d-bf18-885bfcf0d2e8',
      },
      {
        id: 2,
        value: 250,
        account_id: '0eced2fb-bd15-495d-bf18-885bfcf0d2e8',
      },
    ]
    it('returns a list of transactions', async () => {
      accountsRepository.validate.mockResolvedValue(true)
      transactionsRepository.transactionsList.mockResolvedValue(transactions)

      expect(await transactionsService.transactionsList('0eced2fb-bd15-495d-bf18-885bfcf0d2e8')).toEqual(transactions)
    })

    it('returns an empty array', async () => {
      const emptyTransactions = []
      accountsRepository.validate.mockResolvedValue(true)
      transactionsRepository.transactionsList.mockResolvedValue(emptyTransactions)

      expect(await transactionsService.transactionsList('0eced2fb-bd15-495d-bf18-885bfcf0d2e8')).toEqual(
        emptyTransactions,
      )
    })

    it('throws an error when account not found', async () => {
      accountsRepository.validate.mockResolvedValue(false)

      await expect(transactionsService.transactionsList('0eced2fb-bd15-495d-bf18-885bfcf0d2e9')).rejects.toThrow(
        NotFoundException,
      )
    })
  })
})
