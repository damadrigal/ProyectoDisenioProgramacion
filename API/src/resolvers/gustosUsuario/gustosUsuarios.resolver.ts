import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Int,
    Authorized
} from "type-graphql";
import { GustosUsuarios } from "../../entities/gustosUsuarios";
import { InformacionPersonal } from "../../entities/informacionpersonal";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";
import { GustosUsuariosInput } from "./gustosUsuarios.input";

@ObjectType()
@Resolver()

export class GustosUsuarioResolver {

   // @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [GustosUsuarios])
    async TodosGustosUsuario() {
        return GustosUsuarios.find();
    }

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [GustosUsuarios])
    FiltrarGustosCategoria(
        @Arg("categoria", () => String) categoria: string,
    ) {
        if (categoria) {
            return GustosUsuarios.find({ where: { categoria } });

        } else {
            return GustosUsuarios.find();
        }
    }

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [GustosUsuarios])
    FiltrarGustosUsuario(
        @Arg("usuario", () => String) usuario: string,
    ) {
        if (usuario) {
            return GustosUsuarios.find({ where: { usuario } });

        } else {
            return GustosUsuarios.find();
        }
    }

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [GustosUsuarios])
    FiltrarGustolD(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return GustosUsuarios.find({ where: { id } });

        } else {
            return GustosUsuarios.find();
        }
    }

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Mutation(() => InformacionPersonal)
    async RegistrarGustosPersonal(
        @Arg("data", () => GustosUsuariosInput) data: GustosUsuariosInput
    ) {
        try {
            const newData = GustosUsuarios.create(data);
            return await newData.save();
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }
    
    //@Authorized(RolesTypes.OFERENTE)
    @Mutation(() => Boolean)
    async eliminarGusto(
        @Arg("id", () => Int) id: number
    ) {
        await GustosUsuarios.delete(id);
        return true;
    }

   // @Authorized(RolesTypes.ADMIN)
    @Mutation(() => GustosUsuarios)
    async inactivarGusto(
        @Arg("id", () => Int) id: number,
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes
    ) {
        await GustosUsuarios.update({ id }, {estado});
        const dataUpdated = await GustosUsuarios.findOne(id);
        return dataUpdated;
    }
}