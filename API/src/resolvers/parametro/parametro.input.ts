import { InputType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../../enum/roles.enum";
import { EstadosTypes } from "../../enum/estados.enum";


@InputType({ description: "información de los parámetros" })
export class ParametroInput {

    @Authorized(RolesTypes.ADMIN)
    @Field(()=> String)
    codigo!: string

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    nombre!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    valor!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}