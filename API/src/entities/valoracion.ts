import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, Authorized, Int } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { Servicio } from "./servicio";
import { Usuario } from "./usuario";

@ObjectType()
@Entity()
export class Valoracion extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    servicioId!: number;

    @ManyToOne(() => Servicio, servicio => servicio.valoraciones, { lazy: true })
    @Field(type => Servicio)
    servicio!: Servicio;

    @Column()
    usuarioId!: number;

    @ManyToOne(() => Usuario, usuario => usuario.valoraciones, { lazy: true })
    @Field(type => Usuario)
    usuario!: Usuario;

    @Field(()=>Int)
    @Column("int",{default:0})
    valoracion!: number;
}