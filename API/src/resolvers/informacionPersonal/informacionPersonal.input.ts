import { InputType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../../enum/roles.enum";
import { EstadosTypes } from "../../enum/estados.enum";
import { Direccion } from "../../entities/direccion";
import { Usuario } from "../../entities/usuario";


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
    @Field(type => Direccion)
    direccion!: Direccion;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => Usuario)
    usuario!: Usuario;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}