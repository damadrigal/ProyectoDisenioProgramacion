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
    async updateRol(
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