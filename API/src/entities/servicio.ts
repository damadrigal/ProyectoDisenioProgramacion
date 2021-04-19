import { Authorized, Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstadosTypes } from "../enum/estados.enum";
import { RolesTypes } from "../enum/roles.enum";
import { Categoria } from "./categoria";
import { Comentario } from "./comentario";
import { Direccion } from "./direccion";
import { Puesto } from "./puesto";
import { TipoSalario } from "./tipoSalario";
import { Usuario } from "./usuario";
import { ValoracionServicio } from "./valoracionservicio";

@ObjectType()
@Entity()
export class Servicio extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column("text", { nullable: true })
    nombre!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    Descripcion!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    email!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    telefono!: string;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => EstadosTypes)
    @Column("text", { nullable: true })
    estado!: EstadosTypes;

    @OneToOne( type => Usuario, usuario => usuario.servicio)
    @Field(type => Usuario)
    @Column("text", { nullable: true })
    usuario!: Usuario;

    @Field(() => Number)
    @Column("text", { nullable: true })
    salarioMinimo!: Number;

    @Field(() => Number)
    @Column("text", { nullable: true })
    salarioMaximo!: Number;

    @Field(() => Number)
    @Column("text", { nullable: true })
    valoracionPromedio!: Number;

    @Field(() => String)
    @Column("text", { nullable: true })
    imagen!: string;

    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaCreacion!:string;

    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaModificacion!:string;

    @OneToMany( type => ValoracionServicio, valoracionServicio => valoracionServicio.servicio )
    @Column("text", { nullable: true })
    @Field(type => [ValoracionServicio])
    ValoracionesServicio!: ValoracionServicio[];

    @OneToMany( type => Categoria, categoria => categoria.servicios )
    @Field(type => Categoria)
    @Column("text", { nullable: true })
    categoria!: Categoria;

    @OneToMany(() => Comentario, comentario => comentario.usuario, { lazy: true })
    @Field(type => [Comentario])
    comentarios!: Comentario[];

    @OneToMany( type => TipoSalario, tipoSalario => tipoSalario.servicios )
    @Field(type => TipoSalario)
    @Column("text", { nullable: true })
    tipoSalario!:TipoSalario;

    @OneToMany( type => Puesto, puesto => puesto.servicios )
    @Field(type => Puesto)
    @Column("text", { nullable: true })
    puesto!:Puesto;

    @OneToOne( type => Direccion, direccion => direccion.servicio )
    @Field(type => Direccion)
    @Column("text", { nullable: true })
    direccion!: Direccion;

}