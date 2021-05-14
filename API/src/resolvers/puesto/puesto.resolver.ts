import { Authorized, Query, Mutation, Arg, Int } from "type-graphql";
import { Puesto } from "../../entities/puesto";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";
import { PuestoInput } from "./puesto.input";

export class PuestoResolver {
    
    @Query(() => [Puesto])
    async Puestos() {
        return await Puesto.find();
    }

    @Query(() => [Puesto])
    async FiltrarPuesto(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return await Puesto.find({ where: { nombre } });

        } else {
            return await Puesto.find();
        }
    }

    @Query(() => [Puesto])
    async FiltrarPuestoID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return await Puesto.find({ where: { id } });

        } else {
            return await Puesto.find();
        }
    }


    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Puesto)
    async InactivarPuesto(
        @Arg("id", () => Int) id: number,
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes
    ) {
        await Puesto.update({ id }, {estado});
        const dataUpdated = await Puesto.findOne(id);
        return dataUpdated;
    }
    
    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Puesto)
    async ModificarPuesto(
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
            return false;
        }
        return true;
    }
}