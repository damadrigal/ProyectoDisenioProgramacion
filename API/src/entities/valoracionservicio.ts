import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Usuario } from "./usuario";
import {Servicio} from "./servicio";
import { RolesTypes } from "../enum/roles.enum";

@ObjectType()
@Entity()
export class ValoracionServicio extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(() => Number)
    @Column("text", { nullable: true })
    valoracion!: Number;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(type => Servicio,{nullable:true})
    @ManyToOne(() => Servicio, servicio => servicio.valoraciones)
    servicio?: Servicio;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(type => Usuario,{nullable:true})
    @ManyToOne(() => Usuario, usuario => usuario.valoraciones)
    usuario?: Usuario;
}