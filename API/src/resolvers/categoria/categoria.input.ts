import { InputType, Field } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { ServicioInput } from "../servicio/servicio.input";


@InputType({ description: "información de las categorias" })
export class CategoriaInput {
    @Field(() => Number)
    id!: number;

    @Field(() => String)
    codigo?: string;

    @Field(() => String)
    descripcion?: string;

    @Field(type => EstadosTypes)
    estado?: EstadosTypes;

    @Field(type => [ServicioInput])
    servicios?: ServicioInput[];
}