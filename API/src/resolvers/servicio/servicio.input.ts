import {Field, InputType } from "type-graphql";
import { Usuario } from "../../entities/usuario";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";

@InputType({ description: "información editable del usuario" })
export class ServicioInput {
    @Field({ nullable: true })
    nombre!: string

    @Field(type => EstadosTypes)
    estado!: EstadosTypes;

    @Field(() => String)
    Descripcion!: string;

    @Field(() => String)
    email!: string;

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
    createdAt!:string;

    @Field(()=> String)
    updateAt!:string;
}