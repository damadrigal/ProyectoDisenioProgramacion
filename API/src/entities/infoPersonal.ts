import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, BaseEntity, ManyToOne, OneToOne } from "typeorm";
import { ObjectType, Field, ID, Authorized, registerEnumType } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { EstadosTypes } from "../enum/estados.enum";
import { Valoracion } from "./valoracion";
import { Usuario } from "./usuario";

@ObjectType()
@Entity()
export class InformacionPersonal extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized()
    @Field(() => String)
    @Column("text", { nullable: true })
    nombre!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    primerApellido!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    segundoApellido!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    correo!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    telefono!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    direccion!: string;

    @Column()
    usuarioId!: number;

    @OneToOne(() => Usuario, usuario => usuario.informacionPersonal, { lazy: true })
    @Field(type => Usuario)
    usuario!: Promise<Usuario>
}