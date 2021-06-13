import { InputType, Field } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";

@InputType({ description: "información de la valoración de un servicio" })
export class TipoSalarioInput {

    @Field(() => Number)
    id!: number;

    @Field(() => String)
    codigo?: string;

    @Field(() => String)
    descripcion?: string;

    @Field(type => EstadosTypes)
    estado?: EstadosTypes;

}