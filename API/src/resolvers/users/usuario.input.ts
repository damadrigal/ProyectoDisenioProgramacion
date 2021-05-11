import {Field, ID, InputType } from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";

@InputType({ description: "información editable del usuario" })
export class UsuarioInput {
    @Field(() => ID)
    id?: number;
    
    @Field({ nullable: true })
    nombre?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    password?: string;

    @Field(type => RolesTypes)
    role?: RolesTypes;

    @Field(type => EstadosTypes)
    estado?: EstadosTypes;


}