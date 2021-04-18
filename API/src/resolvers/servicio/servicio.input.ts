import {Field, InputType } from "type-graphql";
import { Usuario } from "../../entities/usuario";
import { EstadosTypes } from "../../enum/estados.enum";

@InputType({ description: "información editable del usuario" })
export class ServicioInput {

    @Field(() => String)
    nombre!: string;

    @Field(() => String)
    Descripcion!: string;

    @Field(() => String)
    email!: string;

    @Field(() => String)
    telefono!: string;

    @Field(type => Usuario)
    usuario!: Usuario;

    @Field(() => Number)
    salarioMinimo!: Number;

    @Field(() => Number)
    salarioMaximo!: Number;

    @Field(() => String)
    imagen!: string;

    @Field(()=> String)
    fechaCreacion!:string;

    @Field(()=> String)
    fechaModificacion!:string;
}