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

    //TODO: analisar el acceso a esta informacion por parte de los roles
    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [InformacionPersonal])
    async InfoPersonal() {
        return await InformacionPersonal.find();
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [InformacionPersonal])
    async FiltrarInfoPersonal(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return await InformacionPersonal.find({ where: { nombre } });

        } else {
            return await InformacionPersonal.find();
        }
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [InformacionPersonal])
    async FiltrarInfoPersonalUsuario(
        @Arg("usuario", () => UsuarioInput) usuario: UsuarioInput,
    ) {
        if (usuario) {
            return await InformacionPersonal.find({ where: { usuario } });

        } else {
            return await InformacionPersonal.find();
        }
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [InformacionPersonal])
    async FiltrarInfoPersonalID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return await InformacionPersonal.find({ where: { id } });

        } else {
            return await InformacionPersonal.find();
        }
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Mutation(() => InformacionPersonal)
    async ModificarInfoPersonal(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => InformacionPersonalInput) data: InformacionPersonalInput
    ) {
        await InformacionPersonal.update({ id }, data);
        const dataUpdated = await InformacionPersonal.findOne(id);
        return dataUpdated;
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Mutation(() => InformacionPersonal)
    async RegistrarInfoPersonal(
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
    async EliminarInfoPersonal(
        @Arg("id", () => Int) id: number
    ) {
        await InformacionPersonal.delete(id);
        return true;
    }
}