import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne,OneToOne, OneToMany, CreateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Usuario } from "./usuario";
import { EstadosTypes } from "../enum/estados.enum";
import { InformacionPersonal } from "./informacionpersonal";

@ObjectType()
@Entity()
export class AmigosUsuario extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion?: string;

    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaCreacion!:string;
	
    @Field(type => Usuario,{nullable:true})
    @ManyToOne(() => Usuario, usuario => usuario.amigos,{eager:true})
    usuario?: Usuario;

    @Field(type => InformacionPersonal,{nullable:true})
    @ManyToOne( type => InformacionPersonal, duenoAmigo => duenoAmigo.amigos)
    duenoAmigo?: InformacionPersonal;
    
}