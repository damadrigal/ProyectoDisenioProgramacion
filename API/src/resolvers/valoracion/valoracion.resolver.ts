import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { ValoracionServicio } from "../../entities/valoracionservicio";
import { RolesTypes } from "../../enum/roles.enum";
import { ValoracionInput } from "./valoracion.input";



@Resolver()
export class ValoracionResolver {

    @Query(() => [ValoracionServicio])
    async Valoraciones() {
        return ValoracionServicio.find();
    }

    @Authorized([RolesTypes.ADMIN])
    @Mutation(() => ValoracionServicio)
    async crearValoracion(
        @Arg("data", () => ValoracionInput) data: ValoracionInput
    ) {
        const newData = ValoracionServicio.create(data);
        return await newData.save();
    }

    @Authorized([RolesTypes.CLIENTE])
    @Mutation(() => ValoracionServicio)
    public async modificarValoracion(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ValoracionInput) data: ValoracionInput
    ) {
        await ValoracionServicio.update({ id }, data);
        const dataUpdated = await ValoracionServicio.findOne(id);
        return dataUpdated;
    }

}