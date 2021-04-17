import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";

@ObjectType()
@Entity()
export class Alarma extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized( )
    @Field(() => String)
    @Column("text", { nullable: true })
    tipoAlarma!: String;

    @Authorized( )
    @Field(() => String)
    @Column("text", { nullable: true })
    descipcion!: String;
}