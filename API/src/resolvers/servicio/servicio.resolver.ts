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
import { EstadosTypes } from "../../enum/estados.enum";

@Resolver()
export class ServicioResolver {

    @Query(() => [Servicio])
    async Servicios() {
        return Servicio.find();
    }    

    @Authorized(RolesTypes.OFERENTE)
    @Mutation(() => Boolean)
    async crearServicio(
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
    
    @Authorized([RolesTypes.OFERENTE,RolesTypes.ADMIN])
    @Mutation(() => Servicio)
    async modificarServicio(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ServicioInput) data: ServicioInput
    ) {
        await Servicio.update({ id }, data);
        const dataUpdated = await Servicio.findOne(id);
        return dataUpdated;
    }

    @Authorized(RolesTypes.OFERENTE)
    @Mutation(() => Boolean)
    async eliminarServicio(
        @Arg("id", () => Int) id: number
    ) {
        await Servicio.delete(id);
        return true;
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Servicio)
    async inactivarServicio(
        @Arg("id", () => Int) id: number,
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes
    ) {
        await Servicio.update({ id }, {estado});
        const dataUpdated = await Servicio.findOne(id);
        return dataUpdated;
    }

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Servicio])
    filtrarServicio(
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
    filtrarServicioEstado(
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes,
    ) {
        if (estado) {
            return Servicio.find({ where: { estado } });

        }
    }

    @Query(() => [Servicio])
    valoracionPorUsuario(
        @Arg("usuarioId", () => Int) usuarioId: number
    ) {
        return Servicio.find({ where: { usuarioId } });
    }

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Servicio])
    filtrarServicioNombreSal( 
        @Arg("nombre", () => String) nombre: string,
        @Arg("salarioMinimo", () => String) salarioMinimo: Number,
    ) {
        if (nombre) {
            return Servicio.find({ where: { nombre,salarioMinimo } });

        } else {
            return Servicio.find();
        }
    }

    @Query(() => [Servicio])
    TopServicioMejoresValorados(
        @Arg("servicioId", () => Int) servicioId: number
    ) {
        return Servicio.find({ where: { servicioId } });
    }

    @Query(() => [Servicio])
    ServiciosMejorValorados(
    ) {
        return Servicio.find({ order: { "valoracionPromedio":"DESC" } });
    }

    @Query(() => [Servicio])
    ServiciosPeorValorados(
    ) {
        return Servicio.find({ order: { "valoracionPromedio":"ASC" } });
    }
}