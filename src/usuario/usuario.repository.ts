import { Injectable } from "@nestjs/common"

@Injectable()
export class UsuarioRepository{
    private usuarios = [];

    async salvar(usuario){
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