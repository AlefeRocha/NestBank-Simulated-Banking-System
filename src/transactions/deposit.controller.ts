import { Body, Controller, Post } from '@nestjs/common'
import { TransactionsService } from './transaction.service'

@Controller('deposit')
export class DepositController {
  constructor(private transactionService: TransactionsService) {}

  @Post()
  async webhookDeposit(@Body() { input: { account_id, amount } }: any): Promise<{ balance: number }> {
    await this.transactionService.deposit(account_id, amount)
    const balance = await this.transactionService.balance(account_id)
    return { balance }
  }
}
