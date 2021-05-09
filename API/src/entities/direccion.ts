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

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion!: string;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(() => String)
    @Column("text", { nullable: true })
    longitud!: string;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(() => String)
    @Column("text", { nullable: true })
    latitud!: string;

    @Field (() => Servicio,{nullable:true})
    @OneToOne( () => Servicio, servicio => servicio.usuario)
    servicio!: Servicio;
}