import { Field, InputType } from "type-graphql";
import { InformacionPersonal } from "../../entities/informacionpersonal";
import { Usuario } from "../../entities/usuario";
import { InformacionPersonalInput } from "../informacionPersonal/informacionPersonal.input";
import { UsuarioInput } from "../users/usuario.input";

@InputType({ description: "Amigos de los usuarios" })
export class AmigosUsuarioInput {
    @Field(() => Number)
    id!: number;

    @Field(() => String)
    descripcion?: string;
     
    @Field(() => String)
    fechaCreacion!: string;

    @Field(type => UsuarioInput)
    usuario?: Usuario;

    @Field(type => InformacionPersonalInput)
    duenoAmigo?: InformacionPersonal;
}