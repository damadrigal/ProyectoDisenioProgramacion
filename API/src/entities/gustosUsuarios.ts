import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne,OneToOne, OneToMany, CreateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Usuario } from "./usuario";
import { EstadosTypes } from "../enum/estados.enum";
import { Categoria } from "./categoria";
import { RolesTypes } from "../enum/roles.enum";

@ObjectType()
@Entity()
export class GustosUsuarios extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion?: string;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(()=> String)
    @CreateDateColumn({type:'timestamp'})
    fechaCreacion!:string;
	
    @Field(type => Categoria,{nullable:true})
    @ManyToOne(() => Categoria, categoria => categoria.gustos,{eager:true})
    categoria?: Categoria;
    
	
    @Field(type => Usuario,{nullable:true})
    @ManyToOne(() => Usuario, usuario => usuario.gustos)
    usuario?: Usuario;

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Field(type => EstadosTypes)
    @Column("text")
    estado?: EstadosTypes;
}