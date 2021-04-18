import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Servicio } from "./servicio";
import { RolesTypes } from "../enum/roles.enum";

@ObjectType()
@Entity()
export class Direccion extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized()
    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion!: string;

    @Authorized()
    @Field(() => String)
    @Column("text", { nullable: true })
    longitud!: string;

    @Authorized()
    @Field(() => String)
    @Column("text", { nullable: true })
    latitud!: string;

    @Authorized(RolesTypes.ADMIN)
    @OneToOne(() => Servicio, servicio => servicio.direccion, { lazy: true })
    @Field(type => Servicio)
    servicio!: Promise<Servicio>
}