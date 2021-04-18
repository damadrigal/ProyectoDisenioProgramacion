import { Field, InputType, Int } from "type-graphql";
import { ServicioInput } from "../servicio/servicio.input";
import { UsuarioInput } from "../users/usuario.input";

@InputType({ description: "información de la valoración de un servicio" })
export class ValoracionInput {

    @Field(()=>Int)
    servicio!: ServicioInput;

    @Field(()=>Int)
    usuario!: UsuarioInput;

    @Field(()=>Int)
    valoracion!: number;
}