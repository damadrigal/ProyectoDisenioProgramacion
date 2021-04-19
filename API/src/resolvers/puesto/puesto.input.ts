import { InputType, Field } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { ServicioInput } from "../servicio/servicio.input";

@InputType({ description: "información de la valoración de un servicio" })
export class PuestoInput {

    @Field(() => String)
    codigo!: string;

    @Field(() => String)
    descripcion!: string;

    @Field(type => EstadosTypes)
    estado!: EstadosTypes;

    @Field(type => [ServicioInput])
    servicios!: ServicioInput[];
}