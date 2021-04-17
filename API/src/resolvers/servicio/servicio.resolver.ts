import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Int,
    Authorized
} from "type-graphql";
import {Servicio } from "../../entities/servicio";
import { ServicioInput } from "../servicio/servicio.input";

@Resolver()
export class ServicioResolver {

    @Query(() => [Servicio])
    async Servicios() {
        return Servicio.find();
    }

    @Authorized("ADMIN")
    @Mutation(() => Servicio)
    async updateUsuario(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ServicioInput) data: ServicioInput
    ) {
        await Servicio.update({ id }, data);
        const dataUpdated = await Servicio.findOne(id);
        return dataUpdated;
    }
}