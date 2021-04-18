import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Int,
    Authorized
} from "type-graphql";
import {Usuario } from "../../entities/usuario";
import { InformacionPersonalInput } from "./informacionPersonal.input";
import { InformacionPersonal } from "../../entities/informacionpersonal";
import { Direccion } from "../../entities/direccion";
import { RolesTypes } from "../../enum/roles.enum";

@ObjectType()
@Resolver()

export class InformacionPersonalResolver {
    
    @Query(() => [InformacionPersonal])
    async Parametros() {
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
        @Arg("nombre") nombre: string,
        @Arg("priapellido") priapellido: string,
        @Arg("segapellido") segapellido: string,
        @Arg("telefono") telefono: string,
        @Arg("correo") correo: string,
        @Arg("direccion") direccion: Direccion,
        @Arg("usuario") usuario: Usuario
    ) {
        try {
            await InformacionPersonal.insert({
                nombre,
                priapellido,
                segapellido,
                telefono,
                correo,
                direccion,
                usuario
            });
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