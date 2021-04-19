import { Authorized, Query, Mutation, Arg, Int } from "type-graphql";
import { Puesto } from "../../entities/puesto";
import { PuestoInput } from "./puesto.input";

export class PuestoResolver {
    @Authorized("ADMIN")
    @Query(() => [Puesto])
    async Puestos() {
        return Puesto.find();
    }

    @Authorized("ADMIN")
    @Mutation(() => Puesto)
    async updatePuesto(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => PuestoInput) data: PuestoInput
    ) {
        await Puesto.update({ id }, data);
        const dataUpdated = await Puesto.findOne(id);
        return dataUpdated;
    }

    @Authorized("ADMIN")
    @Mutation(() => Puesto)
    async RegisterPuesto(
        @Arg("data") data: PuestoInput
    ) {
        try {
            await Puesto.insert(data);
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    @Authorized("ADMIN")
    @Query(() => [Puesto])
    FilterPuesto(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return Puesto.find({ where: { nombre } });

        } else {
            return Puesto.find();
        }
    }

    @Authorized("ADMIN")
    @Query(() => [Puesto])
    FilterPuestoID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return Puesto.find({ where: { id } });

        } else {
            return Puesto.find();
        }
    }

    @Mutation(() => Boolean)
    async deletePuesto(
        @Arg("id", () => Int) id: number
    ) {
        await Puesto.delete(id);
        return true;
    }
}