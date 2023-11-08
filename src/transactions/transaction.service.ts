import { Injectable } from "@nestjs/common";
import { TransactionsRepository } from "./transaction.repository";

@Injectable()
export class TransactionsService {
    constructor(private transactionRepository: TransactionsRepository) {}
}