import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, BaseEntity, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Authorized, registerEnumType } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { EstadosTypes } from "../enum/estados.enum";
import { ValoracionServicio } from "./valoracionservicio";
import { InformacionPersonal } from "./informacionpersonal";
import { Comentario } from "./comentario";
import { Servicio } from "./servicio";


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

    @Authorized(RolesTypes.ADMIN)
    @OneToMany(() => ValoracionServicio, valoracion => valoracion.usuario, { lazy: true })
    @Field(type => [ValoracionServicio])
    valoraciones!: ValoracionServicio[];

    @Authorized(RolesTypes.ADMIN)
    @OneToOne(() => InformacionPersonal, informacionPersonal => InformacionPersonal.usuario, { lazy: true })
    @Field(type => InformacionPersonal)
    informacionPersonal!: InformacionPersonal;

    @Authorized(RolesTypes.ADMIN)
    @OneToMany(() => Comentario, comentario => comentario.usuario, { lazy: true })
    @Field(type => [Comentario])
    comentarios!: Comentario[];

    @Authorized(RolesTypes.ADMIN)
    @OneToOne(() => Servicio, servicio => servicio.usuario, { lazy: true })
    @Field(type => Servicio)
    servicio!: Servicio;
    
    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    @Column("text", { nullable: true })
    observacion!: string;
}