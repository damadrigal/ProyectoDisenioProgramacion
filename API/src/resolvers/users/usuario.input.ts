import {Field, InputType } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";

@InputType({ description: "información editable del usuario" })
export class UsuarioInput {
    @Field({ nullable: true })
    nombre?: string

    @Field(type => RolesTypes)
    role!: RolesTypes;

    @Field()
    createdAt!:string;

    @Field()
    updateAt!:string;

    @Field(type => EstadosTypes)
    estado!: EstadosTypes;
}