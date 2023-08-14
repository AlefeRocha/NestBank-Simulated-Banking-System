import { Injectable } from "@nestjs/common"
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository{
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity){
        this.usuarios.push(usuario);
    }

    async listar(){
        return this.usuarios;
    }
    
    async existeComEmail(email: string){
        const possivelusurario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return possivelusurario !== undefined;
    }
}