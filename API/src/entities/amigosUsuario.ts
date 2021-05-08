import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne,OneToOne, OneToMany, CreateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Usuario } from "./usuario";
import { EstadosTypes } from "../enum/estados.enum";

@ObjectType()
@Entity()
export class AmigosUsuario extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    //@Authorized( )
    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion?: string;

    //@Authorized()
    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaCreacion!:string;
	
	//@Authorized( )
    //@Field(type => Usuario,{nullable:true})
    //@ManyToOne(() => Usuario, usuarioAmigo => usuarioAmigo.amigoUsu,{eager:true}) // amigos del usuario
    //usuarioAmigo?: Usuario;
    
	
	//@Authorized( )
    //@Field(type => Usuario,{nullable:true})
    //@ManyToOne(() => Usuario, usuario => usuario.amigos) // usuario dueño
    //amigos?: Usuario;

    //@Authorized( )
    @Field(type => EstadosTypes)
    @Column("text")
    estado?: EstadosTypes;
}