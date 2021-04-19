import { Authorized, Query, Mutation, Arg, Int } from "type-graphql";
import { Puesto } from "../../entities/puesto";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";
import { PuestoInput } from "./puesto.input";

export class PuestoResolver {
    
    @Query(() => [Puesto])
    async Puestos() {
        return Puesto.find();
    }

    @Query(() => [Puesto])
    FiltrarPuesto(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return Puesto.find({ where: { nombre } });

        } else {
            return Puesto.find();
        }
    }

    @Query(() => [Puesto])
    FiltrarPuestoID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return Puesto.find({ where: { id } });

        } else {
            return Puesto.find();
        }
    }


    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Puesto)
    async inactivarPuesto(
        @Arg("id", () => Int) id: number,
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes
    ) {
        await Puesto.update({ id }, {estado});
        const dataUpdated = await Puesto.findOne(id);
        return dataUpdated;
    }
    
    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Puesto)
    async modificaPuesto(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => PuestoInput) data: PuestoInput
    ) {
        await Puesto.update({ id }, data);
        const dataUpdated = await Puesto.findOne(id);
        return dataUpdated;
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Puesto)
    async RegistrarPuesto(
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
}