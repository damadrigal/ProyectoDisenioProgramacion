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
        @Arg("data", () => Servicio) data: ServicioInput
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
    FilterRol( // cambiar nombre  verificar rol en autorización
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return Servicio.find({ where: { nombre } });

        } else {
            return Servicio.find();
        }
    }

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Servicio])
    FilterServicioPorNombreSal( // cambiar nombre 
        @Arg("nombre", () => String) nombre: string,
        @Arg("salarioMinimo", () => String) salarioMinimo: Number,
    ) {
        if (nombre) {
            return Servicio.find({ where: { nombre,salarioMinimo } });

        } else {
            return Servicio.find();
        }
    }


}