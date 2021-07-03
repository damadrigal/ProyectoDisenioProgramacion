import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Int,
    Authorized
} from "type-graphql";
import { AmigosUsuario } from "../../entities/amigosUsuario";
import { InformacionPersonal } from "../../entities/informacionpersonal";
import { Usuario } from "../../entities/usuario";
import { UsuarioInput } from "../users/usuario.input";
import { AmigosUsuarioInput } from "./amigo.input";

@ObjectType()
@Resolver()

export class AmigosUsuarioResolver {

    @Query(() => [AmigosUsuario])
    ListarAmigosDeUnUsuario(
        @Arg("duenoAmigo", () => Int) duenoAmigo: UsuarioInput,
    ) {
        if (duenoAmigo) {
            return AmigosUsuario.find({ where: { duenoAmigo } });

        } else {
            return AmigosUsuario.find();
        }
    }

    @Query(() => [AmigosUsuario])
    ListarDeQuienSoyAmigo(
        @Arg("usuario", () => UsuarioInput) usuario: UsuarioInput,
    ) {
        if (usuario) {
            return AmigosUsuario.find({ where: { usuario } });

        } else {
            return AmigosUsuario.find();
        }
    }

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Mutation(() => AmigosUsuario)
    async RegistrarAmigos(
        @Arg("idUsuario", () => Int) idUsuario: Usuario,
        @Arg("idDueno", () => Int) idDueno: InformacionPersonal
    ) {
        try {
            var data!: AmigosUsuarioInput;
            data.duenoAmigo = idDueno;
            data.usuario = idUsuario;
            const newData = AmigosUsuario.create(data);
            return await newData.save();
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }
    
    @Mutation(() => Boolean)
    async EliminarAmigo(
        @Arg("id", () => Int) id: number
    ) {
        await AmigosUsuario.delete(id);
        return true;
    }
}