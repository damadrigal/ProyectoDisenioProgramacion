import { InputType, Field, ID, Authorized } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";


@InputType({ description: "información de los parámetros" })
export class ParametroInput {

    @Field(()=> String)
    codigo!: string

    @Field(() => String)
    nombre!: string;

    @Field(() => String)
    valor!: string;

    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}