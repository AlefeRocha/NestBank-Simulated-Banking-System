import { Controller, Post } from '@nestjs/common'
import { TransactionsService } from './transaction.service'

@Controller('negative-balance-notify')
export class NegativeBalanceNotifyController {
  constructor(private transactionService: TransactionsService) {}

  @Post()
  async negativeBalanceNotify(): Promise<any> {
    const accounts = await this.transactionService.getAccounts()
    for (let i = 0; i < accounts.length; i++) {
      const balance = await this.transactionService.balance(accounts[i].id)
      if (balance < 0) {
        const name = await this.transactionService.getName(accounts[i].id)
        console.log(`Olá ${name}, seu saldo está negativo. Por favor, realize um depósito.`)
        // return `Olá ${name}, seu saldo está negativo. Por favor, realize um depósito.`
      }
    }
  }
}
