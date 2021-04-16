import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";

@ObjectType()
@Entity()
export class Direccion extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized()
    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion!: string;

    @Authorized()
    @Field(() => String)
    @Column("text", { nullable: true })
    longitud!: string;

    @Authorized()
    @Field(() => String)
    @Column("text", { nullable: true })
    latitud!: string;
}