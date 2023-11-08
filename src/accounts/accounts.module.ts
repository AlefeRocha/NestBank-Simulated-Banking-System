import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { AccountsController } from './accounts.controller'
import { AccountsRepository } from './accounts.repository'
import { AccountsService } from './accounts.service'

@Module({
  imports: [HttpModule],
  controllers: [AccountsController],
  providers: [AccountsRepository, AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
