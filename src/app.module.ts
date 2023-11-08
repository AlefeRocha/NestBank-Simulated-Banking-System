import { Module } from '@nestjs/common'
import { AccountsModule } from './accounts/accounts.module'
import { CoreModule } from './core/core.module'
import { TransactionModule } from './transactions/transaction.module'

@Module({
  imports: [AccountsModule, TransactionModule, CoreModule],
})
export class AppModule {}
