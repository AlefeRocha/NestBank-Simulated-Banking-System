import { Controller, Get, Put } from '@nestjs/common'
import { TransactionsService } from './transaction.service';

@Controller('transaction')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Put('/:id/deposit')
  async deposit() {}

  @Put('/:id/withdraw')
  async withdraw() {}

  @Get('/:id/balance')
  async balance() {}

  @Get('/:id/transactions')
  async transactionsList() {}
}
