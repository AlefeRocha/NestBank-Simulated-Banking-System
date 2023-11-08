import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { TransactionsService } from './transaction.service'

@Controller('transaction')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Put('/:id/deposit')
  async deposit(@Param('id') id: string, @Body() { value }: { value: number }) {
    return await this.transactionService.deposit(id, value)
  }

  @Put('/:id/withdraw')
  async withdraw(@Param('id') id: string, @Body() { value }: { value: number }) {
    return await this.transactionService.withdraw(id, value)
  }

  @Get('/:id/balance')
  async balance(@Param('id') id: string) {
    return await this.transactionService.balance(id)
  }

  @Get('/:id/transactions')
  async transactionsList(@Param('id') id: string) {
    return await this.transactionService.transactionsList(id)
  }
}
