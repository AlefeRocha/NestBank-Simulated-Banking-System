import { TestBed } from '@automock/jest'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Account } from './accounts.entity'
import { AccountsRepository } from './accounts.repository'
import { AccountsService } from './accounts.service'

describe('AccountsService', () => {
  let accountsService: AccountsService
  let accountRepository: jest.Mocked<AccountsRepository>

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(AccountsService).compile()
    accountsService = unit
    accountRepository = unitRef.get(AccountsRepository)
  })

  describe('#listAccount', () => {
    const accounts: Account[] = [
      new Account({
        id: '0eced2fb-bd15-495d-bf18-885bfcf0d2e8',
        name: 'Test Rogerio',
        email: 'rogerio@n2b.com',
        transactions: [],
      }),
    ]

    it('returns a list of accounts', async () => {
      // prepara o cenário (setup)
      accountRepository.list.mockResolvedValue(accounts)
      // mockResolvedValue() - retorna uma promisse resolvida
      // mockRejectedValue() - retorna uma promisse rejeitada

      // executa o metodo a ser testado (act)
      const result = await accountsService.list()

      // verifica o resultado (verify)
      expect(result).toEqual(accounts)
    })

    it('returns an account by id', async () => {
      // prepara o cenário (setup)
      const id = accounts[0].id
      accountRepository.validate.mockResolvedValue(true)
      accountRepository.searchById.mockResolvedValue(accounts[0])

      //     executa o metodo a ser testado (act)      verifica o resultado (verify)
      expect(await accountsService.getAccountById(id)).toEqual(accounts[0])
    })

    it('throws an error when account not found', async () => {
      expect.assertions(2)
      const id = '0eced2fb-bd15-495d-bf18-885bfcf0d2e9'
      accountRepository.validate.mockResolvedValue(false)

      await expect(accountsService.getAccountById(id)).rejects.toThrow(NotFoundException)
      await expect(accountsService.getAccountById(id)).rejects.toThrow('Account not found')
    })

    it('returns an empty array', async () => {
      const accounts = []
      accountRepository.list.mockResolvedValue(accounts)

      expect(await accountsService.list()).toEqual([])
    })
  })

  describe('#createAccount', () => {
    const newAccount: Account = {
      id: '0eced2fb-bd15-495d-bf18-885bfcf0d2e8',
      name: 'Test name',
      email: 'test@email.com',
      transactions: [],
    }
    it('returns an new account', async () => {
      accountRepository.emailExists.mockResolvedValue(false)
      accountRepository.create.mockResolvedValue(newAccount)

      expect(await accountsService.create('Test name', 'test@email.com')).toEqual(newAccount)
    })

    it('throws an error when email already exists', async () => {
      expect.assertions(2)
      accountRepository.emailExists.mockResolvedValue(true)

      await expect(accountsService.create('Test name', 'test@email.com')).rejects.toThrow(BadRequestException)
      await expect(accountsService.create('Test name', 'test@email.com')).rejects.toThrow('Email already exists')
    })
  })

  describe('#deleteAccount', () => {
    const account: Account = {
      email: 'test@email.com',
      id: '0eced2fb-bd15-495d-bf18-885bfcf0d2e8',
      name: 'Test name',
      transactions: [],
    }

    it('returns an deleted account', async () => {
      accountRepository.validate.mockResolvedValue(true)
      accountRepository.delete.mockResolvedValue(account)

      expect(await accountsService.delete(account.id)).toEqual(account)
    })

    it('throws an error when account not found', async () => {
      expect.assertions(2)
      accountRepository.validate.mockResolvedValue(false)

      await expect(accountsService.delete(account.id)).rejects.toThrow(NotFoundException)
      await expect(accountsService.delete(account.id)).rejects.toThrow('Account not found')
    })
  })
})
