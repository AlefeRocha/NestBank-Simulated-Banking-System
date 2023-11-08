import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { AccountsRepository } from '../accounts/accounts.repository'
import { BalanceController } from './balance.controller'
import { DepositController } from './deposit.controller'
import { NegativeBalanceNotifyController } from './negativeBalanceNotify.controller'
import { TransactionsController } from './transaction.controller'
import { TransactionsRepository } from './transaction.repository'
import { TransactionsService } from './transaction.service'
import { WithdrawController } from './withdraw.controller'

@Module({
  imports: [HttpModule],
  controllers: [
    TransactionsController,
    BalanceController,
    DepositController,
    WithdrawController,
    NegativeBalanceNotifyController,
  ],
  providers: [TransactionsRepository, TransactionsService, AccountsRepository],
  exports: [TransactionsService],
})
export class TransactionModule {}
