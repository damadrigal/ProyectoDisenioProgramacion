import { Field, InputType } from "type-graphql";
import { UsuarioInput } from "../users/usuario.input";

@InputType({ description: "información personal del usuario" })
export class InformacionPersonalInput {

    @Field(() => String)
    nombre!: string;

    @Field(() => String)
    primerApellido!: string;

    @Field(() => String)
    segundoApellido!: string;

    @Field(() => String)
    correo!: string;

    @Field(() => String)
    telefono!: string;

    @Field(() => String)
    direccion!: string;

    @Field(() => String)
    usuarioId!: number;
}