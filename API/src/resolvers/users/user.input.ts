import {Field, InputType } from "type-graphql";
import { RolesTypes } from "../../enum/roles.enum";

@InputType({ description: "Editable user information" })
export class UserInput {
    @Field({ nullable: true })
    name?: string

    @Field()
    notes!: string;

    @Field(type => RolesTypes)
    role!: RolesTypes;

    @Field()
    createdAt!:string;

    @Field()
    updateAt!:string;

    // @Field(type => StateTypes)
    // state!: StateTypes;
}