import { InputType, Field, ID, Authorized } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { Usuario } from "../../entities/usuario";
import { Servicio } from "../../entities/servicio";


@InputType({ description: "información de las categorias" })
export class CategoriaInput {

    @Field(() => Usuario)
    codigo!: Usuario;

    @Field(()=> String)
    descripcion!: string

    @Field(() => Servicio)
    servicio!: Servicio;

    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}