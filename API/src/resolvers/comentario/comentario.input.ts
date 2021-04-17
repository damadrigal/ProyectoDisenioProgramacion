import { InputType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../../enum/roles.enum";
import { EstadosTypes } from "../../enum/estados.enum";
import { Usuario } from "../../entities/usuario";
import { Servicio } from "../../entities/servicio";
import { Comentario } from "../../entities/comentario";


@InputType({ description: "información de los parámetros" })
export class ComentarioInput {

    @Authorized(RolesTypes.ADMIN)
    @Field(()=> String)
    descripcion!: string

    @Authorized(RolesTypes.ADMIN)
    @Field(() => Usuario)
    usuario!: Usuario;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => Servicio)
    servicio!: Servicio;

    @Authorized(RolesTypes.ADMIN)
    @Field({nullable:true})
    comentarioPadre?: Comentario;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}