import { InputType, Field, ID, Authorized } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { Usuario } from "../../entities/usuario";
import { UsuarioInput } from "../users/usuario.input";


@InputType({ description: "información Personal" })
export class InfoPersonalUpdateInput {

    @Field(() => ID)
    id?: number;
    
    @Field(() => String)
    nombre?: string;
     
    @Field(() => String)
    priapellido?: string;
     
    @Field(() => String)
    segapellido?: string;
     
    @Field(() => String)
    telefono?: string;

    @Field(() => String)
    correo?: string;

    @Field(type => UsuarioInput)
    usuario?: Usuario;
}