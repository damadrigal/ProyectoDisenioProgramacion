import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { Valoracion } from "../../entities/valoracion";
import { RolesTypes } from "../../enum/roles.enum";
import { ValoracionInput } from "./valoracion.input";



@Resolver()
export class ValoracionResolver {

    @Query(() => [Valoracion])
    async Valoraciones() {
        return Valoracion.find();
    }
    
    @Mutation(() => Valoracion)
    async createValoracion(
        @Arg("data", () => ValoracionInput) data: ValoracionInput
    ) {
        const newData = Valoracion.create(data);
        return await newData.save();
    }

   
    @Authorized([RolesTypes.CLIENTE])
    @Mutation(() => Valoracion)
    async updateValoracion(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ValoracionInput) data: ValoracionInput
    ) {
        await Valoracion.update({ id }, data);
        const dataUpdated = await Valoracion.findOne(id);
        return dataUpdated;
    }

    @Query(() => [Valoracion])
    valoracionPorUsuario(
        @Arg("usuarioId", () => Int) usuarioId: number
    ) {
        return Valoracion.find(
            {
                where: {
                    usuarioId
                }
            }
        );
    }

    @Query(() => [Valoracion])
    ValoracionPorServicio(
        @Arg("servicioId", () => Int) servicioId: number
    ) {
        return Valoracion.find(
            {
                where: {
                    servicioId
                }
            }
        );
    }
}