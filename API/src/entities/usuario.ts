import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, BaseEntity, ManyToOne, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { ObjectType, Field, ID, Authorized, registerEnumType } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { EstadosTypes } from "../enum/estados.enum";
import { ValoracionServicio } from "./valoracionservicio";
import { InformacionPersonal } from "./informacionpersonal";
import { Comentario } from "./comentario";
import { Servicio } from "./servicio";
import { Rol } from "./rol";
import { GustosUsuarios } from "./gustosUsuarios";
import { AmigosUsuario } from "./amigosUsuario";
import { InfoReportada } from "./reportado";


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

    @Field(() => String)
    @Column("text", { nullable: true })
    nombre!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    email!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    password!: string;

    @Field(type => RolesTypes)
    @Column("text", { nullable: true })
    role!: RolesTypes;

    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaCreacion!:string;

    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaModificacion!:string;

    @Field(type => EstadosTypes)
    @Column("text", { nullable: true })
    estado!: EstadosTypes;
    
    @Field(() => String)
    @Column("text", { nullable: true })
    observacion!: string;

    @Field (() => Servicio,{nullable:true})
    @OneToOne( () => Servicio, servicio => servicio.usuario)
    servicio!: Servicio;

    @Field(type => Rol,{nullable:true})
    @ManyToOne(() => Rol, rol => rol.usuario,{eager:true,cascade:true})
    rol?: Rol;

    @Field(() => [ValoracionServicio],{nullable:true})
    @OneToMany( () => ValoracionServicio, (valoraciones) => valoraciones.usuario,{eager:true,cascade:true})
    valoraciones?: ValoracionServicio[];

    @Field (() => InformacionPersonal,{nullable:true})
    @OneToOne( () => InformacionPersonal, informacion => informacion.usuario)
    informacion!: InformacionPersonal;

    @Field(() => [Comentario],{nullable:true})
    @OneToMany( () => Comentario, (comentarios) => comentarios.usuario,{eager:true,cascade:true})
    comentarios?: Comentario[];

    @Field(type => [GustosUsuarios],{nullable:true})
    @OneToMany( () => GustosUsuarios, (gustos) => gustos.usuario,{eager:true})
    gustos?: GustosUsuarios[];

    @Field(type => AmigosUsuario,{nullable:true})
    @OneToMany( () => AmigosUsuario, amigos => amigos.usuario)
    amigos?: AmigosUsuario;

    @Field(type => [InfoReportada],{nullable:true})
    @OneToMany( () => InfoReportada, reportados => reportados.usuarioReporta,{eager:true})
    reportados?: InfoReportada[];
}