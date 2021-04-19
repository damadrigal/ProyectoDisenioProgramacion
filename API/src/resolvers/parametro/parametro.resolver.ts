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
import { ParametroInput } from "./parametro.input";
import { Parametro } from "../../entities/parametro";
import { RolesTypes } from "../../enum/roles.enum";

@ObjectType()
@Resolver()

export class ParametroResolver {
    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Parametro])
    async Parametros() {
        return Parametro.find();
    }
    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Parametro)
    async ModificarParametro(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ParametroInput) data: ParametroInput
    ) {
        await Parametro.update({ id }, data);
        const dataUpdated = await Parametro.findOne(id);
        return dataUpdated;
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Parametro)
    async RegistrarParametro( @Arg("data", () => ParametroInput) data: ParametroInput
    ) {
        const newData = Parametro.create(data);
        return await newData.save();
    }

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Parametro])
    FiltrarParametro(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return Parametro.find({ where: { nombre } });

        } else {
            return Parametro.find();
        }
    }

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Parametro])
    FiltrarParametroID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return Parametro.find({ where: { id } });

        } else {
            return Parametro.find();
        }
    }
    
    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Parametro)
    async inactivarParametro(
        @Arg("id", () => Int) id: number,
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes
    ) {
        await Parametro.update({ id }, {estado});
        const dataUpdated = await Parametro.findOne(id);
        return dataUpdated;
    }
}