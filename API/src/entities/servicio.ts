import { Authorized, Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolesTypes } from "../enum/roles.enum";
import { Categoria } from "./categoria";
import { Comentario } from "./comentario";
import { Direccion } from "./direccion";
import { TipoSalario } from "./tipoSalario";
import { Usuario } from "./usuario";
import { ValoracionServicio } from "./valoracionservicio";

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

    @Field(() => String)
    @Column("text", { nullable: true })
    telefono!: string;

    @Authorized(RolesTypes.OFERENTE)
    @OneToOne( type => Usuario, usuario => usuario.servicio)
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

    @Authorized(RolesTypes.OFERENTE)
    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaCreacion!:string;

    @Authorized(RolesTypes.OFERENTE)
    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaModificacion!:string;

    @Authorized(RolesTypes.OFERENTE)
    @OneToMany( type => ValoracionServicio, valoracionServicio => valoracionServicio.servicio )
    @Column("text", { nullable: true })
    @Field(type => [ValoracionServicio])
    ValoracionesServicio!: ValoracionServicio[];

    @Authorized(RolesTypes.OFERENTE)
    @OneToMany( type => Categoria, categoria => categoria.servicios )
    @Field(type => Categoria)
    @Column("text", { nullable: true })
    categoria!: Categoria;

    @Authorized(RolesTypes.OFERENTE)
    @OneToMany(() => Comentario, comentario => comentario.usuario, { lazy: true })
    @Field(type => [Comentario])
    comentarios!: Comentario[];

    @Authorized(RolesTypes.OFERENTE)
    @OneToMany( type => TipoSalario, tipoSalario => tipoSalario.servicios )
    @Field(type => TipoSalario)
    @Column("text", { nullable: true })
    tipoSalario!:TipoSalario;

    @Authorized(RolesTypes.OFERENTE)
    @OneToOne( type => Direccion, direccion => direccion.servicio )
    @Field(type => Direccion)
    @Column("text", { nullable: true })
    direccion!: Direccion;

}