import { Authorized, Query, Mutation, Arg, Int } from "type-graphql";
import { TipoSalario } from "../../entities/tipoSalario";
import { EstadosTypes } from "../../enum/estados.enum";
import { TipoSalarioInput } from "./tipoSalario.input";

export class TipoSalarioResolver {
    @Authorized("ADMIN")
    @Query(() => [TipoSalario])
    async TipoSalarios() {
        return TipoSalario.find();
    }

    @Authorized("ADMIN")
    @Mutation(() => TipoSalario)
    async updateTipoSalario(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => TipoSalarioInput) data: TipoSalarioInput
    ) {
        await TipoSalario.update({ id }, data);
        const dataUpdated = await TipoSalario.findOne(id);
        return dataUpdated;
    }

    @Authorized("ADMIN")
    @Mutation(() => TipoSalario)
    async RegisterTipoSalario(
        @Arg("data") data: TipoSalarioInput
    ) {
        try {
            await TipoSalario.insert(data);
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    @Authorized("ADMIN")
    @Query(() => [TipoSalario])
    FilterTipoSalario(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return TipoSalario.find({ where: { nombre } });

        } else {
            return TipoSalario.find();
        }
    }

    @Authorized("ADMIN")
    @Query(() => [TipoSalario])
    FilterTipoSalarioID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return TipoSalario.find({ where: { id } });

        } else {
            return TipoSalario.find();
        }
    }

    @Mutation(() => Boolean)
    async deleteTipoSalario(
        @Arg("id", () => Int) id: number
    ) {
        await TipoSalario.delete(id);
        return true;
    }
}