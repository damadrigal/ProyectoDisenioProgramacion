import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { Usuario } from "./usuario";
import { AmigosUsuario } from "./amigosUsuario";

@ObjectType()
@Entity()
export class InformacionPersonal extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(() => String)
    @Column("text", { nullable: true })
    nombre!: string;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(() => String)
    @Column("text", { nullable: true })
    priapellido!: string;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(() => String)
    @Column("text", { nullable: true })
    segapellido!: string;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(() => String)
    @Column("text", { nullable: true })
    telefono!: string;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(() => String)
    @Column("text", { nullable: true })
    correo!: string;    
    
    // @Column()
    // usuarioId?: number;

    @Field (() => Usuario,{nullable:true})
    @OneToOne( () => Usuario,usuario => usuario.informacion,{eager:true,cascade:true})
    @JoinColumn()
    usuario?: Usuario;

    @Field(type => [AmigosUsuario],{nullable:true})
    @OneToMany( () => AmigosUsuario, (amigos) => amigos.duenoAmigo,{eager:true,cascade:true})
    amigos?: AmigosUsuario[];
}