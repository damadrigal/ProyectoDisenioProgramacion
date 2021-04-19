import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Int,
    Authorized
} from "type-graphql";
import { InformacionPersonalInput } from "./informacionPersonal.input";
import { InformacionPersonal } from "../../entities/informacionpersonal";
import { UsuarioInput } from "../users/usuario.input";
import { DireccionInput } from "../direccion/direccion.input";
import { RolesTypes } from "../../enum/roles.enum";

@ObjectType()
@Resolver()

export class InformacionPersonalResolver {

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [InformacionPersonal])
    async InformacionPersonal() {
        return InformacionPersonal.find();
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Mutation(() => InformacionPersonal)
    async updateInformacionPersonal(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => InformacionPersonalInput) data: InformacionPersonalInput
    ) {
        await InformacionPersonal.update({ id }, data);
        const dataUpdated = await InformacionPersonal.findOne(id);
        return dataUpdated;
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Mutation(() => InformacionPersonal)
    async RegisterInforPersonal(
        @Arg("data", () => InformacionPersonalInput) data: InformacionPersonalInput
    ) {
        try {
            const newData = InformacionPersonal.create(data);
            return await newData.save();
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [InformacionPersonal])
    FilterInfoPersonal(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return InformacionPersonal.find({ where: { nombre } });

        } else {
            return InformacionPersonal.find();
        }
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [InformacionPersonal])
    FilterinformacionPersonalD(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return InformacionPersonal.find({ where: { id } });

        } else {
            return InformacionPersonal.find();
        }
    }

    @Mutation(() => Boolean)
    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    async deleteInformacionPersonal(
        @Arg("id", () => Int) id: number
    ) {
        await InformacionPersonal.delete(id);
        return true;
    }
}