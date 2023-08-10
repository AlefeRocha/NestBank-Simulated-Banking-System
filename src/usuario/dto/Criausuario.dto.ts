import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";


export class CriaUsuarioDTO {
    
    @IsNotEmpty({ message: 'O nome não pode ser vazio!'})
    nome: string;

    @IsEmail(undefined, { message: 'O email informado é inválido!'})
    @EmailUnico({ message: 'Já existe um usuário com esse email!'})
    email: string;

    @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres!'})
    senha: string;
}