import { InputType, Field, ID, Authorized } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { UsuarioInput } from "../users/usuario.input";
import { ComentarioInput } from "../comentario/comentario.input";


@InputType({ description: "información de los comentarios reportados" })
export class ReportadoInput {

    @Field(() => String)
    descripción!: string;

    @Field({nullable:true})
    usuario!: UsuarioInput;

    @Field({nullable:true})
    comentario!: ComentarioInput;

    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}