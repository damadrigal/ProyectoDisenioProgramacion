import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { EstadosTypes } from "../enum/estados.enum";
import { Usuario } from "./usuario";

@ObjectType()
@Entity()
export class Rol extends BaseEntity {
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
    descripcion!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => EstadosTypes)
    @Column("text")
    estado!: EstadosTypes;

    @Field(type => Usuario,{nullable:true})
    @OneToMany( () => Usuario, usuario => usuario.rol)
    usuario?: Usuario;
}