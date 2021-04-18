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
import { RolesTypes } from "../../enum/roles.enum";

@Resolver()
export class ServicioResolver {

    @Query(() => [Servicio])
    async Servicios() {
        return Servicio.find();
    }

    @Authorized(RolesTypes.OFERENTE)
    @Mutation(() => Boolean)
    async createServicio(
        @Arg("data", () => ServicioInput) data: ServicioInput
    ) {
        try {
            await Servicio.insert(data);
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }
    
    @Authorized(RolesTypes.OFERENTE)
    @Mutation(() => Servicio)
    async updateServicio(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ServicioInput) data: ServicioInput
    ) {
        await Servicio.update({ id }, data);
        const dataUpdated = await Servicio.findOne(id);
        return dataUpdated;
    }

    @Authorized(RolesTypes.OFERENTE)
    @Mutation(() => Boolean)
    async deleteServicio(
        @Arg("id", () => Int) id: number
    ) {
        await Servicio.delete(id);
        return true;
    }

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Servicio])
    FilterRol(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return Servicio.find({ where: { nombre } });

        } else {
            return Servicio.find();
        }
    }

    @Query(() => [Servicio])
    valoracionPorUsuario(
        @Arg("usuarioId", () => Int) usuarioId: number
    ) {
        return Servicio.find({ where: { usuarioId } });
    }

    @Query(() => [Servicio])
    TopServicioMejoresValorados(
        @Arg("servicioId", () => Int) servicioId: number
    ) {
        return Servicio.find({ where: { servicioId } });
    }
}