import { Authorized, Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RolesTypes } from "../enum/roles.enum";
import { Usuario } from "./usuario";

@ObjectType()
@Entity()
export class Servicio extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized()
    @Field(() => String)
    @Column("text", { nullable: true })
    nombre!: string;

    @Authorized([RolesTypes.ADMIN, RolesTypes.OFERENTE])
    @Field(() => String)
    @Column("text", { nullable: true })
    Descripcion!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    email!: string;

    @Column("text", { nullable: true })
    telefono!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => Usuario)
    @Column("text", { nullable: true })
    usuario!: Usuario;

    @Authorized()
    @Field(() => Number)
    @Column("text", { nullable: true })
    salarioMinimo!: Number;

    @Authorized()
    @Field(() => Number)
    @Column("text", { nullable: true })
    salarioMaximo!: Number;

    @Authorized()
    @Field(() => String)
    @Column("text", { nullable: true })
    imagen!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    createdAt!:string;

    @Authorized(RolesTypes.ADMIN)
    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    updateAt!:string;
}