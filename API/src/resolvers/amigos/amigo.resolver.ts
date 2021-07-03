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
        @Arg("usuario", () => Int) usuario: UsuarioInput,
    ) {
        if (usuario) {
            return AmigosUsuario.find({ where: { usuario } });

        } else {
            return AmigosUsuario.find();
        }
    }
    @Query(() => [AmigosUsuario])
    ExisteAmigosDeUnUsuario(
        @Arg("idUsuario", () => Int) idUsuario: Usuario,
        @Arg("idDueno", () => Int) idDueno: InformacionPersonal
    ) {
            return AmigosUsuario.find({ where: { usuario: idUsuario, duenoAmigo: idDueno} });
    }

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Mutation(() => Boolean)
    async RegistrarAmigos(
        @Arg("idUsuario", () => Int) idUsuario: Usuario,
        @Arg("idDueno", () => Int) idDueno: InformacionPersonal
    ) {
        try {
            await AmigosUsuario.insert({
              duenoAmigo: idDueno,
              usuario: idUsuario
            });
          } catch (err) {
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