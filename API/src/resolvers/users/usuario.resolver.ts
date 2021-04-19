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
import { Usuario } from "../../entities/usuario";
import enviroment from "../../config/enviroments.config";
import { sign } from "jsonwebtoken";

import { isAuthenticated } from "../../middleware/is-authenticated";
import { Context } from "../../interfaces/context.interface";
import { RolesTypes } from "../../enum/roles.enum";
import { UsuarioInput } from "./usuario.input"
import { EstadosTypes } from "../../enum/estados.enum";


@ObjectType()
class LoginResponse {
    @Field()
    accessToken?: string;
}

@Resolver()
export class UsuarioResolver {
    
    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Usuario])
    async Usuarios() {
        return Usuario.find();
    }

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Usuario])
    FiltrarUsuarioEstado(
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes,
    ) {
        if (estado) {
            return Usuario.find({ where: { estado } });

        } else {
            return Usuario.find();
        }
    }

    @Query(() => String)
    @UseMiddleware(isAuthenticated)
    async usuarioActual(@Ctx() { usuario }: Context) {

        return `Su id Usuario : ${usuario!.id}`;
    }

    @Query(() => String)
    @UseMiddleware(isAuthenticated)
    async obtenerRolUsuario(@Ctx() { usuario }: Context) {

        return usuario!.role;
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Usuario)
    async modificarUsuario(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => UsuarioInput) data: UsuarioInput
    ) {
        await Usuario.update({ id }, data);
        const dataUpdated = await Usuario.findOne(id);
        return dataUpdated;
    }

    @Mutation(() => Boolean)
    async Registrar(
        @Arg("nombre") nombre: string,
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Arg("role") role: RolesTypes
    ) {
        const hashedPassword = await hash(password, 13);
        try {
            await Usuario.insert({
                nombre,
                email,
                password: hashedPassword,
                role,
                estado: EstadosTypes.ACTIVO
            });
        } catch (err) {
            return false;
        }

        return true;
    }

    @Mutation(() => LoginResponse)
    async Login(@Arg("email") email: string, @Arg("password") password: string,@Ctx() { req,res }: Context) {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            throw new Error("No se encontró el Usuario");
        }

        const verify = await compare(password, usuario.password);

        if (!verify) {
            throw new Error("Contraseña erronea");
        }


        const refreshToken =  sign({ usuario: usuario }, enviroment.jwtSecretKey, {
            expiresIn: "7d"
        });
        
        const accessToken = sign({ usuario: usuario }, enviroment.jwtSecretKey, {
            expiresIn: "10h"
        });
        
        res.cookie("authorization","bearer "+refreshToken,{httpOnly:true});
        return {
            accessToken: sign({ usuario: usuario }, enviroment.jwtSecretKey, {
                expiresIn: "10h"
            })
        };
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Usuario)
    async AsignarRol(@Arg("id") id: number, @Arg("rol") rol: RolesTypes) {
        const usuario = await Usuario.findOne({ where: { id } });

        if (!usuario) {
            throw new Error("No se encontró el Usuario");
        }

        if (!usuario?.role) {
            usuario.role = rol;
        }

        return await this.modificarUsuario(id, usuario);
    }
    
}