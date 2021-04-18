import { InputType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../../enum/roles.enum";
import { EstadosTypes } from "../../enum/estados.enum";
import { Direccion } from "../../entities/direccion";
import { Usuario } from "../../entities/usuario";
import { DireccionInput } from "../direccion/direccion.input";
import { UsuarioInput } from "../users/usuario.input";


@InputType({ description: "información Personal" })
export class InformacionPersonalInput {

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    nombre!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    priapellido!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    segapellido!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    telefono!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    correo!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => DireccionInput)
    direccion!: DireccionInput;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => UsuarioInput)
    usuario!: UsuarioInput;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}