import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateAccountDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  name: string

  @IsEmail(undefined, { message: 'O email deve ser válido!' })
  email: string
}
