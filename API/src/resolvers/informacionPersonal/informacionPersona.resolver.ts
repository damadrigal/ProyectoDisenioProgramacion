import { Resolver } from "type-graphql";
import { Authorized, Query, Arg } from "type-graphql";
import { InformacionPersonal } from "../../entities/infoPersonal";
import { RolesTypes } from "../../enum/roles.enum";
import { InformacionPersonalInput } from "./informacionPersonal.input";

@Resolver()
export class ValoracionResolver {
    @Authorized([RolesTypes.CLIENTE])
    @Query(() => InformacionPersonal)
    async createValoracion(
        @Arg("data", () => InformacionPersonalInput) data: InformacionPersonalInput
    ) {
        const newData = InformacionPersonal.create(data);
        return await newData.save();
    }
}