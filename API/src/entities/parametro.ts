import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { EstadosTypes } from "../enum/estados.enum";

@ObjectType()
@Entity()
export class Parametro extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    @Column("text", { nullable: true })
    codigo!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    @Column("text", { nullable: true })
    nombre!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    @Column("text", { nullable: true })
    valor!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => EstadosTypes)
    @Column("text")
    estado!: EstadosTypes;
}