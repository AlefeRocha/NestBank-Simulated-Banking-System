import { Controller, Delete, Get, Post } from "@nestjs/common";
import { AccountsService } from "./accounts.service";

@Controller('account')
export class AccountsController {
constructor(private accountsService: AccountsService) {}

    @Post()
    async create() {}

    @Get()
    async list() {}

    @Get('/:id')
    async getById() {}

    @Delete('/:id')
    async delete() {}
}