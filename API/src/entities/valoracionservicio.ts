import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Usuario } from "./usuario";
import {Servicio} from "./servicio";

@ObjectType()
@Entity()
export class ValoracionServicio extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized( )
    @Field(() => Number)
    @Column("text", { nullable: true })
    valoracion!: Number;

    @Authorized( )
    @Field(() => Servicio)
    @Column("text", { nullable: true })
    servicio!: Servicio;

    @Authorized( )
    @Field(type => Usuario)
    @Column("text", { nullable: true })
    usuario!: Usuario;
}