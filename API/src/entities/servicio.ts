import { Authorized, Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstadosTypes } from "../enum/estados.enum";
import { RolesTypes } from "../enum/roles.enum";
import { Categoria } from "./categoria";
import { Comentario } from "./comentario";
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
    descripcion!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    email!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    telefono!: string;

    
    @Field(() => EstadosTypes)
    @Column("text", { nullable: true })
    estado!: EstadosTypes;

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

    @Field(() => String)
    @Column("text", { nullable: true })
    longitud!: string;

    @Field(() => String)
    @Column("text", { nullable: true })
    latitud!: string;

    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaCreacion!:string;

    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaModificacion?:string;


    @Field(() => Usuario,{nullable:true})
    @OneToOne( () => Usuario, usuario => usuario.servicio,{eager:true,cascade:true})
    @JoinColumn()
    usuario!: Usuario;

    @Field(() => [ValoracionServicio],{nullable:true})
    @OneToMany( () => ValoracionServicio, (valoraciones) => valoraciones.servicio,{eager:true,cascade:true})
    valoraciones?: ValoracionServicio[];

    @Field(type => [Comentario],{nullable:true})
    @OneToMany( () => Comentario, (comentarios) => comentarios.servicio,{eager:true,cascade:true})
    comentarios?: Comentario[];

    @Field(type => TipoSalario,{nullable:true})
    @ManyToOne(() => TipoSalario, tipoSalario => tipoSalario.servicio,{eager:true})
    tipoSalario?: TipoSalario;

    @Field(type => Categoria,{nullable:true})
    @ManyToOne(() => Categoria, categoria => categoria.servicio,{eager:true})
    categoria?: Categoria;

    @Field(type => Puesto,{nullable:true})
    @ManyToOne(() => Puesto, puesto => puesto.servicio,{eager:true})
    puesto?: Puesto;

}