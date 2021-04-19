import { Arg, Authorized, Int, Mutation, ObjectType, Ctx,UseMiddleware, Query, Resolver } from "type-graphql";
import { Comentario } from "../../entities/comentario";
import { Servicio } from "../../entities/servicio";
import { Usuario } from "../../entities/usuario";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";
import { ServicioInput } from "../servicio/servicio.input";
import { UsuarioResolver } from "../users/usuario.resolver";
import { UsuarioInput } from "../users/usuario.input";
import { ComentarioInput } from "./comentario.input";
import { isAuthenticated } from "../../middleware/is-authenticated";

@ObjectType()
@Resolver()

export class ComentarioResolver { 

    @Query(() => [Comentario])
    async Comentarios() {
        return Comentario.find();
    }

    @Authorized([RolesTypes.CLIENTE, RolesTypes.OFERENTE])
    @Mutation(() => Comentario)
    async createComentario(
        @Arg("data", () => ComentarioInput) data: ComentarioInput
    ) {
        const newData = Comentario.create(data);
        return await newData.save();
    }

    @Authorized([RolesTypes.CLIENTE, RolesTypes.OFERENTE])
    @Mutation(() => Comentario)
    async updateComentario(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ComentarioInput) data: ComentarioInput
    ) {
        await Comentario.update({ id }, data);
        const dataUpdated = await Comentario.findOne(id);
        return dataUpdated;
    }
    @Query(() => [Comentario])
    FilterComentario(
        @Arg("servicio", () => ServicioInput) servicio: ServicioInput,
    ) {
        if (servicio) {
            return Comentario.find({ where: { servicio } });

        } else {
            return Comentario.find();
        }
    }

    
    @Query(() => [Comentario])
    FilterComentarioID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return Comentario.find({ where: { id } });

        } else {
            return Comentario.find();
        }
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Comentario)
    async inactivarServicio(
        @Arg("id", () => Int) id: number,
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes
    ) {
        await Comentario.update({ id }, {estado});
        const dataUpdated = await Comentario.findOne(id);
        return dataUpdated;
    }
    
    @Authorized([RolesTypes.CLIENTE, RolesTypes.OFERENTE])
    @UseMiddleware(isAuthenticated)
    @Mutation(() => Boolean)
    async deleteComentario(
        @Arg("id", () => Int) id: number
    ) {
        await Comentario.delete(id);
        return true;
    }
}