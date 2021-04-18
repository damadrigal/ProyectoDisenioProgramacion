import { InputType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../../enum/roles.enum";
import { EstadosTypes } from "../../enum/estados.enum";
import { Direccion } from "../../entities/direccion";
import { Usuario } from "../../entities/usuario";


@InputType({ description: "información Personal" })
export class InformacionPersonalInput {

    @Field(() => String)
    nombre!: string;
     
    @Field(() => String)
    priapellido!: string;
     
    @Field(() => String)
    segapellido!: string;
     
    @Field(() => String)
    telefono!: string;
     
    @Field(() => String)
    correo!: string;

    @Field(type => Direccion)
    direccion!: Direccion;

    @Field(type => Usuario)
    usuario!: Usuario;

    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}