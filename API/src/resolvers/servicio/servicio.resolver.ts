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
import { getRepository } from "typeorm";
import { UsuarioInput } from "../users/usuario.input";
import { Puesto } from "../../entities/puesto";
import { Categoria } from "../../entities/categoria";
import { Usuario } from "../../entities/usuario";
import { TipoSalario } from "../../entities/tipoSalario";

@Resolver()
export class ServicioResolver {

    @Query(() => [Servicio])
    async Servicios() {
        return Servicio.find();
    }

    @Authorized(RolesTypes.ADMIN)
    @Query(() => [Servicio])
    FiltrarServicio(
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
    FltrarServicioEstado(
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes,
    ) {
        if (estado) {
            return Servicio.find({ where: { estado } });

        }
    }

    @Query(() => [Servicio])
    FiltrarServicioPorUsuario(
        @Arg("usuarioId", () => Int) usuarioId: number
    ) {
        return Servicio.find({ where: { usuario: usuarioId } });
    }

    @Query(() => [Servicio])
    FiltrarServicioPorId(
        @Arg("servicioId", () => Int) servicioId: number
    ) {
        return Servicio.find({ where: { servicioId } });
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
    ServiciosMejorValorados(
    ) {
        return Servicio.find({ order: { "valoracionPromedio":"DESC" } });
    }

    @Query(() => [Servicio])
    ServiciosPeorValorados(
    ) {
        return Servicio.find({ order: { "valoracionPromedio":"ASC" } });
    }    

    @Authorized(RolesTypes.OFERENTE)
    @Mutation(() => Servicio)
    async crearServicio(
        @Arg("data", () => ServicioInput) data: ServicioInput
    ) {
        data.estado = EstadosTypes.ACTIVO;
        try {
            await Servicio.insert(data);
            const nombre = data.nombre;
            const correo = data.email;
            const descrip = data.descripcion;
            const dataUpdated = await Servicio.findOne({ where: { nombre,email:correo,descripcion:descrip } });
            console.log(dataUpdated);
            return dataUpdated;
        } catch (err) {
            console.log(err);
            return;
        }
    }
    @Authorized([RolesTypes.OFERENTE,RolesTypes.ADMIN])
    @Mutation(() => Boolean)
    async modificarOtrosServicio(
        @Arg("idServicio", () => String) id: number,
        @Arg("idCategoria", () => String) idCategoria: Categoria,
        @Arg("idPuesto", () => String) idPuesto: Puesto,
        @Arg("idTipoSalario", () => String) idTipoSalario: TipoSalario,
        @Arg("idUsuario", () => String) idUsuario: Usuario
    ) {
        console.log(id,idCategoria,idPuesto,idTipoSalario,idUsuario)
        try{
            await Servicio.update({id}, {puesto:idPuesto,categoria:idCategoria,tipoSalario:idTipoSalario,usuario:idUsuario});
            return true;
        } catch (err) {
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
}