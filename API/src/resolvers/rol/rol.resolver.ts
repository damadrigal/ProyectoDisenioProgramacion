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
import { RolInput } from "./rol.input";
import { Rol } from "../../entities/rol";
import { RolesTypes } from "../../enum/roles.enum";

@ObjectType()
@Resolver()

export class RolResolver {
    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Rol])
    async Roles() {
        return Rol.find();
    }   

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Rol])
    filtrarRol(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return Rol.find({ where: { nombre } });

        } else {
            return Rol.find();
        }
    }

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Rol])
    filtrarRolID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return Rol.find({ where: { id } });

        } else {
            return Rol.find();
        }
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Rol)
    async modificarRol(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => RolInput) data: RolInput
    ) {
        await Rol.update({ id }, data);
        const dataUpdated = await Rol.findOne(id);
        return dataUpdated;
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Rol)
    async RegistrarRol(
        @Arg("data" , () => RolInput) data: RolInput
    ) {
        try {
            await Rol.insert(data);
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Rol)
    async inactivarRol(
        @Arg("id", () => Int) id: number,
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes
    ) {
        await Rol.update({ id }, {estado});
        const dataUpdated = await Rol.findOne(id);
        return dataUpdated;
    }
}