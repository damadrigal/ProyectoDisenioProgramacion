import { InputType, Field} from "type-graphql";
import { Usuario } from "../../entities/usuario";
import { UsuarioInput } from "../users/usuario.input";


@InputType({ description: "información Personal" })
export class InfoPersonalInput {

    @Field(() => String)
    nombre?: string;
     
    @Field(() => String)
    priapellido?: string;
     
    @Field(() => String)
    segapellido?: string;
     
    @Field(() => String)
    telefono?: string;

    @Field(() => String)
    correo?: string;
    
}