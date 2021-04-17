import { InputType, Field, Int } from "type-graphql";

@InputType({ description: "información de la valoración de un servicio" })
export class ComentarioInput {

    @Field(()=>String)
    descripcion!: string;

    @Field(()=>Int)
    usuarioId!: number;

    @Field(()=>Int)
    servicioId!: number;

    @Field(()=>Int)
    comentarioPadreId?: number;

}