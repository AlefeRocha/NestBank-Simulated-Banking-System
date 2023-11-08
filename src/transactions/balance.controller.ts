import { Body, Controller, Post } from '@nestjs/common'
import { TransactionsService } from './transaction.service'

@Controller('balance')
export class BalanceController {
  constructor(private transactionService: TransactionsService) {}

  @Post()
  async webhookBalance(@Body() { input: { account_id } }: any): Promise<{ balance: number }> {
    const balance = await this.transactionService.balance(account_id)
    return { balance }
  }
}
