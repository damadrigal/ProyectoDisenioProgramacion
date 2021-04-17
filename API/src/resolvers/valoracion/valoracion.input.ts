import { Field, InputType, Int } from "type-graphql";

@InputType({ description: "información de la valoración de un servicio" })
export class ValoracionInput {

    @Field(()=>Int)
    servicioId!: number;

    @Field(()=>Int)
    usuarioId!: number;

    @Field(()=>Int)
    valoracion!: number;
}