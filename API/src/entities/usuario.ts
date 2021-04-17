import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, BaseEntity, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Authorized, registerEnumType } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { EstadosTypes } from "../enum/estados.enum";
import { Valoracion } from "./valoracion";
import { InformacionPersonal } from "./infoPersonal";
import { Comentario } from "./comentario";


registerEnumType(RolesTypes, {
    name: "RolesTypes",
    description: "Roles types of the application",
    valuesConfig: {
        CLIENTE: {
            description: "rol de usuario cliente",
        },
        OFERENTE: {
            description: "rol de usuario oferente",
        },
        ADMIN: {
            description: "rol de usuario administrador",
        },
    },
});

registerEnumType(EstadosTypes, {
    name: "EstadosTypes",
    description: "Roles types of the application",
    valuesConfig: {
        ACTIVO: {
            description: "estado activo del registro",
        },
        INACTIVO: {
            description: "estado activo del inactivo",
        }
    },
});

@ObjectType()
@Entity()
export class Usuario extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized()
    @Field(() => String)
    @Column("text", { nullable: true })
    nombre!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    email!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    password!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => RolesTypes)
    @Column("text", { nullable: true })
    role!: RolesTypes;

    @Authorized(RolesTypes.ADMIN)
    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaCreacion!:string;

    @Authorized(RolesTypes.ADMIN)
    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaModificacion!:string;

    @Authorized(RolesTypes.ADMIN)
    @Field(type => EstadosTypes)
    @Column("text", { nullable: true })
    estado!: EstadosTypes;

    @OneToMany(() => Valoracion, valoracion => valoracion.usuario, { lazy: true })
    @Field(type => [Valoracion])
    valoraciones!: Promise<Valoracion[]>

    @OneToOne(() => InformacionPersonal, informacionPersonal => informacionPersonal.usuario, { lazy: true })
    @Field(type => InformacionPersonal)
    informacionPersonal!: Promise<InformacionPersonal>

    @OneToMany(() => Comentario, comentario => comentario.usuario, { lazy: true })
    @Field(type => [Comentario])
    comentarios!: Promise<Comentario[]>
}