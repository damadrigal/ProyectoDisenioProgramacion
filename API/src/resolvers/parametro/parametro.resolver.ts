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
import enviroment from "../../config/enviroments.config";
import { sign } from "jsonwebtoken";

import { isAuthenticated } from "../../middleware/is-authenticated";
import { Context } from "../../interfaces/context.interface";
import { RolesTypes } from "../../enum/roles.enum";
import { EstadosTypes } from "../../enum/estados.enum";
import { ParametroInput } from "./parametro.input";
import { Parametro } from "../../entities/parametros";
import { In } from "typeorm";

@ObjectType()
@Resolver()

export class ParametroResolver {
    @Authorized("ADMIN")
    @Query(() => [Parametro])
    async Parametros() {
        return Parametro.find();
    }
    @Authorized("ADMIN")
    @Mutation(() => Parametro)
    async updateParametro(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ParametroInput) data: ParametroInput
    ) {
        await Parametro.update({ id }, data);
        const dataUpdated = await Parametro.findOne(id);
        return dataUpdated;
    }

    @Authorized("ADMIN")
    @Mutation(() => Parametro)
    async RegisterParametro(
        @Arg("codigo") codigo: string,
        @Arg("nombre") nombre: string,
        @Arg("valor") valor: string,
        @Arg("estado") estado: EstadosTypes
    ) {
        try {
            await Parametro.insert({
                codigo,
                nombre,
                valor,
                estado
            });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    @Authorized("ADMIN")
    @Query(() => [Parametro])
    FilterParametro(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return Parametro.find({ where: { nombre } });

        } else {
            return Parametro.find();
        }
    }

    @Authorized("ADMIN")
    @Query(() => [Parametro])
    FilterParametroID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return Parametro.find({ where: { id } });

        } else {
            return Parametro.find();
        }
    }

    @Mutation(() => Boolean)
    async deleteParametro(
        @Arg("id", () => Int) id: number
    ) {
        await Parametro.delete(id);
        return true;
    }
}