import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    UseMiddleware,
    Field,
    Ctx,
    Int,
    Authorized
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import {Usuario } from "../../entities/usuario";
import enviroment from "../../config/enviroments.config";
import { sign } from "jsonwebtoken";

import { isAuthenticated } from "../../middleware/is-authenticated";
import { Context } from "../../interfaces/context.interface";
import { RolesTypes } from "../../enum/roles.enum";
import { UsuarioInput } from "./usuario.input"

@ObjectType()
class LoginResponse {
    @Field()
    accessToken?: string;
}


@Resolver()
export class UsuarioResolver {
    @Query(() => [Usuario])
    async Usuarios() {
        return Usuario.find();
    }
    @Authorized("ADMIN")
    @Mutation(() => Usuario)
    async updateUsuario(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => UsuarioInput) data: UsuarioInput
    ) {
        await Usuario.update({ id }, data);
        const dataUpdated = await Usuario.findOne(id);
        return dataUpdated;
    }

    @Query(() => String)
    @UseMiddleware(isAuthenticated)
    async Me(@Ctx() { usuario }: Context) {

        return `Your Usuario id : ${usuario!.id}`;
    }

    @Mutation(() => Boolean)
    async Register(
        @Arg("nombre") nombre: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const hashedPassword = await hash(password, 13);
        try {
            await Usuario.insert({
                nombre,
                email,
                password: hashedPassword
            });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    @Mutation(() => LoginResponse)
    async Login(@Arg("email") email: string, @Arg("password") password: string) {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            throw new Error("Could not find Usuario");
        }

        const verify = await compare(password, usuario.password);

        if (!verify) {
            throw new Error("Bad password");
        }

        return {
            accessToken: sign({ Usuario: Usuario }, enviroment.jwtSecretKey, {
                expiresIn: "10h"
            })
        };
    }

    @Authorized("ADMIN")
    @Mutation(() => Usuario)
    async SetUsuarioPermision(@Arg("id") id: number, @Arg("rol") rol: RolesTypes) {
        const usuario = await Usuario.findOne({ where: { id } });
        
        if (!usuario) {
            throw new Error("Could not find Usuario");
        }

        if(!usuario?.role){
            usuario.role = rol;
        }
       
        return await this.updateUsuario(id,usuario);
    }


}