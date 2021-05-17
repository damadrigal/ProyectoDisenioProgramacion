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
import { ReportadoInput } from "./reportado.input";
import { InfoReportada } from "../../entities/reportado";
import { RolesTypes } from "../../enum/roles.enum";
import { UsuarioInput } from "../users/usuario.input";

@ObjectType()
@Resolver()

export class ReportadoResolver {

    @Query(() => [InfoReportada])
    async Reportados() {
        return InfoReportada.find();
    }

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [InfoReportada])
    FiltrarInfoReportada(
        @Arg("usuario", () => UsuarioInput) usuario: UsuarioInput,

    ) {
        if (usuario) {
            return InfoReportada.find({ where: { usuario} });

        } else {
            return InfoReportada.find();
        }
    }

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [InfoReportada])
    FiltrarInfoReportaID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return InfoReportada.find({ where: { id } });

        } else {
            return InfoReportada.find();
        }
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => InfoReportada)
    async ModificarInfoReportada(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ReportadoInput) data: ReportadoInput
    ) {
        await InfoReportada.update({ id }, data);
        const dataUpdated = await InfoReportada.findOne(id);
        return dataUpdated;
    }

    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Mutation(() => InfoReportada)
    async RegistrarInfoReportada(
        @Arg("data" , () => ReportadoInput) data: ReportadoInput
    ) {
        try {
            await InfoReportada.insert(data);
        } catch (err) {
            return false;
        }
        return true;
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => InfoReportada)
    async InactivarInfoReportada(
        @Arg("id", () => Int) id: number,
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes
    ) {
        await InfoReportada.update({ id }, {estado});
        const dataUpdated = await InfoReportada.findOne(id);
        return dataUpdated;
    }
}