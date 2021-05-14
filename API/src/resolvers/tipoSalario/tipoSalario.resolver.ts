import { Authorized, Query, Mutation, Arg, Int } from "type-graphql";
import { TipoSalario } from "../../entities/tipoSalario";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";
import { TipoSalarioInput } from "./tipoSalario.input";

export class TipoSalarioResolver {

    
    @Query(() => [TipoSalario])
    async TipoSalarios() {
        return TipoSalario.find();
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE])
    @Query(() => [TipoSalario])
    async FiltrarTipoSalarioCodigo(
        @Arg("codigo", () => String) codigo: string,
    ) {
        return await TipoSalario.find({ where: { codigo } });        
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => TipoSalario)
    async ModificarTipoSalario(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => TipoSalarioInput) data: TipoSalarioInput
    ) {
        await TipoSalario.update({ id }, data);
        const dataUpdated = await TipoSalario.findOne(id);
        return dataUpdated;
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => TipoSalario)
    async RegistrarTipoSalario(
        @Arg("data") data: TipoSalarioInput
    ) {
        try {
            await TipoSalario.insert(data);
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => TipoSalario)
    async InactivarTipoSalario(
        @Arg("id", () => Int) id: number,
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes
    ) {
        await TipoSalario.update({ id }, {estado});
        const dataUpdated = await TipoSalario.findOne(id);
        return dataUpdated;
    }
}