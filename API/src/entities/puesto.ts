import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { EstadosTypes } from "../enum/estados.enum";
import { Servicio } from "./servicio";

@ObjectType()
@Entity()
export class Puesto extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column("text", { nullable: true })
    codigo!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion!: string;

    @Field(type => EstadosTypes)
    @Column("text")
    estado!: EstadosTypes;

    @Field(type => Servicio,{nullable:true})
    @OneToMany( () => Servicio, servicio => servicio.puesto)
    servicio?: Servicio;
}