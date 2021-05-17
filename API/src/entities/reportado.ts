import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Usuario } from "./usuario";
import { Comentario } from "./comentario";
import { EstadosTypes } from "../enum/estados.enum";

@ObjectType()
@Entity()
export class InfoReportada extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion!: string;

    @Field(type => EstadosTypes)
    @Column("text")
    estado!: EstadosTypes;

    @Field(type => Usuario,{nullable:true})
    @ManyToOne(() => Usuario, usuarioReporta => usuarioReporta.reportados)
    usuarioReporta?: Usuario;

    @Field(type => Comentario,{nullable:true})
    @ManyToOne(() => Comentario, comentarioReportado => comentarioReportado.reportados)
    comentarioReportado!: Comentario;
}