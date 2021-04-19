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
import { RolesTypes } from "../../enum/roles.enum";
import { UsuarioInput } from "../users/usuario.input";

@ObjectType()
@Resolver()

export class InformacionPersonalResolver {

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [InformacionPersonal])
    async InformacionPersonal() {
        return InformacionPersonal.find();
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [InformacionPersonal])
    FiltrarInfoPersonal(
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
    FiltrarInfoPersonalUsuario(
        @Arg("usuario", () => UsuarioInput) usuario: UsuarioInput,
    ) {
        if (usuario) {
            return InformacionPersonal.find({ where: { usuario } });

        } else {
            return InformacionPersonal.find();
        }
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [InformacionPersonal])
    FiltrarinformacionPersonalD(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return InformacionPersonal.find({ where: { id } });

        } else {
            return InformacionPersonal.find();
        }
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Mutation(() => InformacionPersonal)
    async modificarInformacionPersonal(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => InformacionPersonalInput) data: InformacionPersonalInput
    ) {
        await InformacionPersonal.update({ id }, data);
        const dataUpdated = await InformacionPersonal.findOne(id);
        return dataUpdated;
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Mutation(() => InformacionPersonal)
    async RegistrarInforPersonal(
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

    @Mutation(() => Boolean)
    @Authorized(RolesTypes.OFERENTE)
    async eliminarInformacionPersonal(
        @Arg("id", () => Int) id: number
    ) {
        await InformacionPersonal.delete(id);
        return true;
    }
}