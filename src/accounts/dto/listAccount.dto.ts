export class ListAccountsDto {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string
    ) {}
}