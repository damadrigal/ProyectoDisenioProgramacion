import {Field, InputType } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { UsuarioInput } from "../users/usuario.input";

@InputType({ description: "información editable del usuario" })
export class ServicioInput {

    @Field(() => String)
    nombre?: string;

    @Field(() => String)
    Descripcion?: string;

    @Field(() => String)
    email?: string;

    @Field(() => String)
    telefono?: string;

    @Field(() => EstadosTypes)
    estado!: EstadosTypes;

    @Field(type => UsuarioInput)
    usuario?: UsuarioInput;

    @Field(() => Number)
    salarioMinimo?: Number;

    @Field(() => Number)
    salarioMaximo?: Number;

    @Field(() => Number)
    valoracionPromedio!: Number;

    @Field(() => String)
    imagen?: string;

    @Field(()=> String)
    fechaCreacion?:string;

    @Field(()=> String)
    fechaModificacion?:string;
}