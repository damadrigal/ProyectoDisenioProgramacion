import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { EstadosTypes } from "../enum/estados.enum";
import { Usuario } from "./usuario";
import { Servicio } from "./servicio";

@ObjectType()
@Entity()
export class Comentario extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized(RolesTypes.ADMIN)
    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion!: string;

    @Column()
    usuarioId!: number;

    @ManyToOne(() => Usuario, usuario => usuario.comentarios, { lazy: true })
    @Field(type => Usuario)
    usuario!: Promise<Usuario>

    @ManyToOne(() => Servicio, servicio => servicio.comentarios, { lazy: true })
    @Field(type => Servicio)
    servicio!: Promise<Servicio>

    @ManyToOne(() => Comentario, comentario => comentario.comentariosHijos, { lazy: true })
    @Field(type => Comentario)
    comentarioPadre?: Comentario;

    @OneToMany(() => Comentario, comentario => comentario.comentarioPadre, { lazy: true })
    @Field(type => Comentario)
    comentariosHijos?: Promise<[Comentario]>

}