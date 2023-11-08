import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../common/repositories/base.repository";

@Injectable()
export class TransactionsRepository extends BaseRepository {}