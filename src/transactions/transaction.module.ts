import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { AccountsRepository } from '../accounts/accounts.repository'
import { TransactionsController } from './transaction.controller'
import { TransactionsRepository } from './transaction.repository'
import { TransactionsService } from './transaction.service'

@Module({
  imports: [HttpModule],
  controllers: [
    TransactionsController,
  ],
  providers: [TransactionsRepository, TransactionsService, AccountsRepository],
  exports: [TransactionsService],
})
export class TransactionModule {}
