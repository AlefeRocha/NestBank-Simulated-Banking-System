import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";


export class AtualizaUsuarioDTO {
    
    @IsNotEmpty({ message: 'O nome não pode ser vazio!'})
    @IsOptional()
    nome: string;

    @IsEmail(undefined, { message: 'O email informado é inválido!'})
    @EmailUnico({ message: 'Já existe um usuário com esse email!'})
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres!'})
    @IsOptional()
    senha: string;
}