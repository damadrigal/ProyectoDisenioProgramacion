import { InputType, Field, ID, Authorized } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { Usuario } from "../../entities/usuario";
import { Servicio } from "../../entities/servicio";
import { Comentario } from "../../entities/comentario";


@InputType({ description: "información de los parámetros" })
export class ComentarioInput {

    @Field(()=> String)
    descripcion!: string

    @Field(() => Usuario)
    usuario!: Usuario;

    @Field(() => Servicio)
    servicio!: Servicio;

    @Field({nullable:true})
    comentarioPadre?: Comentario;

    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}