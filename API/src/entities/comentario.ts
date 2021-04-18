import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Usuario } from "./usuario";
import { Servicio } from "./servicio";
import { EstadosTypes } from "../enum/estados.enum";

@ObjectType()
@Entity()
export class Comentario extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized( )
    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion!: string;

    @Authorized( )
    @ManyToOne( type => Servicio, servicio => servicio.comentarios)
    @Field(() => Servicio)
    @Column("text", { nullable: true })
    servicio!: Servicio;

    @Authorized( )
    @ManyToOne( type => Usuario, usuario => usuario.comentarios)
    @Field(type => Usuario)
    @Column("text", { nullable: true })
    usuario!: Usuario;

    @Authorized( )
    @Field(type => EstadosTypes)
    @Column("text")
    estado!: EstadosTypes;

    @Authorized( )
    @ManyToOne(() => Comentario, comentario => comentario.comentariosHijos, { lazy: true })
    @Field(type => Comentario)
    @Column("text",{nullable: true})
    comentarioPadre!: Comentario;

    @Authorized( )
    @OneToMany(() => Comentario, comentario => comentario.comentarioPadre, { lazy: true })
    @Field(type => [Comentario])
    @Column("text",{nullable: true})
    comentariosHijos!: Comentario[];
}