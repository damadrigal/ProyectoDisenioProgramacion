import { InputType, Field } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { ServicioInput } from "../servicio/servicio.input";
import { UsuarioInput } from "../users/usuario.input";


@InputType({ description: "información de los comentarios" })
export class ComentarioInput {

    @Field(()=> String)
    descripcion!: string

    @Field(()=> String)
    fechaCreacion!:string;

    @Field({nullable:true})
    usuario!: UsuarioInput;

    @Field({nullable:true})
    servicio!: ServicioInput;

    @Field({nullable:true})
    comentarioPadre?:ComentarioInput;

    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}