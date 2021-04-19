import { Field, InputType, Int } from "type-graphql";
import { ServicioInput } from "../servicio/servicio.input";
import { UsuarioInput } from "../users/usuario.input";

@InputType({ description: "información de la valoración de un servicio" })
export class ValoracionInput {

    @Field(()=>UsuarioInput)
    servicio?: ServicioInput;

    @Field(()=>UsuarioInput)
    usuario?: UsuarioInput;

    @Field(()=>Int)
    valoracion?: number;
}