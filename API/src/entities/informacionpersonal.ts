import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { Usuario } from "./usuario";
import { Direccion} from "./direccion";

@ObjectType()
@Entity()
export class InformacionPersonal extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    @Column("text", { nullable: true })
    nombre!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    @Column("text", { nullable: true })
    priapellido!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    @Column("text", { nullable: true })
    segapellido!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    @Column("text", { nullable: true })
    telefono!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    @Column("text", { nullable: true })
    correo!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => Direccion)
    @Column("text", { nullable: true })
    direccion!: Direccion;

    @Authorized(RolesTypes.ADMIN)
    @OneToOne(() => Usuario, usuario => usuario.informacionPersonal, { lazy: true })
    @Field(type => Usuario)
    @Column("text", { nullable: true })
    usuario!: Usuario;
}