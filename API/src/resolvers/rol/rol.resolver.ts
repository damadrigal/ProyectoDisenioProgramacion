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
import { EstadosTypes } from "../../enum/estados.enum";
import { RolInput } from "./rol.input";
import { Rol } from "../../entities/rol";
import { In } from "typeorm";

@ObjectType()
@Resolver()

export class RolResolver {
    @Authorized("ADMIN")
    @Query(() => [Rol])
    async Roles() {
        return Rol.find();
    }

    @Authorized("ADMIN")
    @Mutation(() => Rol)
    async updateParametro(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => RolInput) data: RolInput
    ) {
        await Rol.update({ id }, data);
        const dataUpdated = await Rol.findOne(id);
        return dataUpdated;
    }

    @Authorized("ADMIN")
    @Mutation(() => Rol)
    async RegisterRol(
        @Arg("codigo") codigo: string,
        @Arg("descripcion") descripcion: string,
        @Arg("estado") estado: EstadosTypes
    ) {
        try {
            await Rol.insert({
                codigo,
                descripcion,
                estado
            });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    @Authorized("ADMIN")
    @Query(() => [Rol])
    FilterRol(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return Rol.find({ where: { nombre } });

        } else {
            return Rol.find();
        }
    }

    @Authorized("ADMIN")
    @Query(() => [Rol])
    FilterRolID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return Rol.find({ where: { id } });

        } else {
            return Rol.find();
        }
    }

    @Mutation(() => Boolean)
    async deleteRol(
        @Arg("id", () => Int) id: number
    ) {
        await Rol.delete(id);
        return true;
    }
}