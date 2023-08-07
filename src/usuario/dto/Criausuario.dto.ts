import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class CriaUsuarioDTO {
    
    @IsNotEmpty({ message: 'O nome não pode ser vazio!'})
    nome: string;

    @IsEmail(undefined, { message: 'O email informado não é inválido!'})
    email: string;

    @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres!'})
    senha: string;
}