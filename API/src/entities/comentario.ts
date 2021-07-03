import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Usuario } from "./usuario";
import { Servicio } from "./servicio";
import { EstadosTypes } from "../enum/estados.enum";
import { RolesTypes } from "../enum/roles.enum";
import { InfoReportada } from "./reportado";

@ObjectType()
@Entity()
export class Comentario extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion!: string;

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaCreacion!:string;

    @Field(type => Servicio,{nullable:true})
    @ManyToOne( type => Servicio, servicio => servicio.comentarios)
    servicio?: Servicio;

    @Field(type => Usuario,{nullable:true})
    @ManyToOne( type => Usuario, servicio => servicio.comentarios,{eager:true})
    usuario?: Usuario;


    @Field(type => EstadosTypes)
    @Column("text")
    estado!: EstadosTypes;

    @ManyToOne(() => Comentario, comentario => comentario.comentariosHijos, { lazy: true })
    @Field(type => Comentario)
    @Column("text",{nullable: true})
    comentarioPadre!: Comentario;

    @OneToMany(() => Comentario, comentario => comentario.comentarioPadre, { lazy: true })
    @Field(type => [Comentario])
    @Column("text",{nullable: true})
    comentariosHijos!: Comentario[];

    @Field(type => [InfoReportada],{nullable:true})
    @OneToMany( () => InfoReportada, reportados => reportados.comentarioReportado,{eager:true})
    reportados?: InfoReportada[];
}