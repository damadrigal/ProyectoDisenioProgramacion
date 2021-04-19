import { InputType, Field } from "type-graphql";
import { ServicioInput } from "../servicio/servicio.input";

@InputType({ description: "información de la dirección" })
export class DireccionInput {

    @Field(() => String)
    descripcion?: string;

    @Field(() => String)
    longitud?: string;

    @Field(() => String)
    latitud?: string;

    @Field(type => ServicioInput)
    servicio?: ServicioInput;
}