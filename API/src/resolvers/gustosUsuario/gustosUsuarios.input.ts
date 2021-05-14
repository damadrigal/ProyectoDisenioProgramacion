import { InputType, Field, ID, Authorized } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { UsuarioInput } from "../users/usuario.input";
import { CategoriaInput } from "../categoria/categoria.input";


@InputType({ description: "Gustos de los usuarios" })
export class GustosUsuariosInput {
    @Field(() => Number)
    id!: number;
    @Field(() => String)
    descripcion?: string;
     
    @Field(() => String)
    fechaCreacion!: string;

    @Field(type => EstadosTypes)
    estado?: EstadosTypes;
}