import { InputType, Field } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { ServicioInput } from "../servicio/servicio.input";

@InputType({ description: "información del puesto" })
export class PuestoInput {
    @Field(() => Number)
    id!: number;

    @Field(() => String)
    codigo?: string;

    @Field(() => String)
    descripcion?: string;

    @Field(type => EstadosTypes)
    estado?: EstadosTypes;
}