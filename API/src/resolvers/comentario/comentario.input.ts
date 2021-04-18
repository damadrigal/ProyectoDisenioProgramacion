import { InputType, Field, ID, Authorized } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { Usuario } from "../../entities/usuario";
import { Servicio } from "../../entities/servicio";
import { Comentario } from "../../entities/comentario";
import { ServicioInput } from "../servicio/servicio.input";
import { UsuarioInput } from "../users/usuario.input";


@InputType({ description: "información de los parámetros" })
export class ComentarioInput {

    @Field(()=> String)
    descripcion!: string

    @Field({nullable:true})
    usuario!: UsuarioInput;

    @Field({nullable:true})
    servicio!: ServicioInput;

    @Field({nullable:true})
    comentarioPadre?:ComentarioInput;

    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}