import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { Servicio } from "../../entities/servicio";
import { ValoracionServicio } from "../../entities/valoracionservicio";
import { RolesTypes } from "../../enum/roles.enum";
import { ValoracionInput } from "./valoracion.input";



@Resolver()
export class ValoracionResolver {

    @Query(() => [ValoracionServicio])
    async Valoraciones() {
        return ValoracionServicio.find();
    }

    @Mutation(() => ValoracionServicio)
    async createValoracion(
        @Arg("data", () => ValoracionInput) data: ValoracionInput
    ) {
        const newData = ValoracionServicio.create(data);
        return await newData.save();
    }


    @Authorized([RolesTypes.CLIENTE])
    @Mutation(() => ValoracionServicio)
    async updateValoracion(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ValoracionInput) data: ValoracionInput
    ) {
        await ValoracionServicio.update({ id }, data);
        const dataUpdated = await ValoracionServicio.findOne(id);
        return dataUpdated;
    }

  
}