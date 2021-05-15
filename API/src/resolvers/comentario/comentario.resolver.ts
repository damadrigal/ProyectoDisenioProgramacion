import { Arg, Authorized, Int, Mutation, ObjectType, Ctx,UseMiddleware, Query, Resolver } from "type-graphql";
import { Comentario } from "../../entities/comentario";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";
import { ServicioInput } from "../servicio/servicio.input";
import { Context } from "../../interfaces/context.interface";
import { ComentarioInput } from "./comentario.input";
import { isAuthenticated } from "../../middleware/is-authenticated";

@ObjectType()
@Resolver()

export class ComentarioResolver { 

    @Query(() => [Comentario])
    async Comentarios() {
        return await Comentario.find({ order: { "fechaCreacion":"DESC" } });
    }

    @Query(() => [Comentario])
    async FiltrarComentario(
        @Arg("servicio", () => ServicioInput) servicio: ServicioInput,
    ) {
        if (servicio) {
            return await Comentario.find({ where: { servicio }, order: { "fechaCreacion":"DESC" } });

        } else {
            return await Comentario.find();
        }
    }

    
    @Query(() => [Comentario])
    async FiltrarComentarioId(
        @Arg("id", () => Int) id: string,
    ) {
        if (id) {
            return await Comentario.find({ where: { id } });

        } else {
            return await Comentario.find();
        }
    }

    @Authorized([RolesTypes.CLIENTE, RolesTypes.OFERENTE])
    @Mutation(() => Comentario)
    async CrearComentario(
        @Arg("data", () => ComentarioInput) data: ComentarioInput
    ) {
        const newData = Comentario.create(data);
        return await newData.save();
    }

    @Authorized([RolesTypes.CLIENTE, RolesTypes.OFERENTE])
    @Mutation(() => Comentario)
    async ModificarComentario(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ComentarioInput) data: ComentarioInput
    ) {
        await Comentario.update({ id }, data);
        const dataUpdated = await Comentario.findOne(id);
        return dataUpdated;
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Comentario)
    async InactivarActivarComentario(
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
    async EliminarComentario(
        @Arg("id", () => Int) id: number,
        @Ctx() { usuario }: Context
    ) {
        if (usuario!.role == RolesTypes.ADMIN)
        {
            try{                
                await this.InactivarActivarComentario(id,EstadosTypes.INACTIVO)
                return true;            
            }catch (err) {
                return false;
            }
        }
        const consultaComentario = await Comentario.findOne({where : {id}});
        if (usuario!.id == consultaComentario?.usuario!.id)
        {
            try{                
                await Comentario.delete(id);
                return true;            
            }catch (err) {
                return false;
            }
        }       
        return true;
    }


}