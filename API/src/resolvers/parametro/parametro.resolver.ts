import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Int,
    Authorized
} from "type-graphql";
import { EstadosTypes } from "../../enum/estados.enum";
import { ParametroInput } from "./parametro.input";
import { Parametro } from "../../entities/parametro";
import { RolesTypes } from "../../enum/roles.enum";

@ObjectType()
@Resolver()

export class ParametroResolver {
    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Parametro])
    async Parametros() {
        return Parametro.find();
    }
    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Parametro)
    async updateParametro(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ParametroInput) data: ParametroInput
    ) {
        await Parametro.update({ id }, data);
        const dataUpdated = await Parametro.findOne(id);
        return dataUpdated;
    }

    @Authorized(RolesTypes.ADMIN)
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

    @Authorized(RolesTypes.ADMIN)
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

    @Authorized(RolesTypes.ADMIN)
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
    
    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Boolean)
    async deleteParametro(
        @Arg("id", () => Int) id: number
    ) {
        await Parametro.delete(id);
        return true;
    }
}