import { Body, Controller, Post } from '@nestjs/common'
import { TransactionsService } from './transaction.service'

@Controller()
export class WithdrawController {
  constructor(private transactionService: TransactionsService) {}

  @Post('withdraw')
  async webhookWithdraw(@Body() { input: { account_id, amount } }: any): Promise<{ balance: any }> {
    const balance = await this.transactionService.withdraw(account_id, amount)
    return { balance }
  }

  @Post('transaction/withdraw')
  async withdrawNotification(@Body() dataEvent: any): Promise<void> {
    const name = await this.transactionService.getName(dataEvent.event.data.new.account_id)
    const value = dataEvent.event.data.new.value
    if (await this.transactionService.isWithdrawTransaction(value)) {
      console.log(
        `Olá ${name}, você realizou um saque no valor de R$${-value}. Caso não tenha realizado essa operação, entre em contato com o banco.`,
      )
    }
  }
}
