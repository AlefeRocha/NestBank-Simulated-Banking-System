import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { CreateAccountDto } from './dto/createAccount.dto'

@Controller('account')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post()
  async create(@Body() userAccount: CreateAccountDto) {
    return await this.accountsService.create(userAccount.name, userAccount.email)
  }

  @Get()
  async list() {
    return await this.accountsService.list()
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.accountsService.getAccountById(id)
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.accountsService.delete(id)
  }
}
