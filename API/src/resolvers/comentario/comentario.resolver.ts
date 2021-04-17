import { Arg, Authorized, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Comentario } from "../../entities/comentario";
import { Servicio } from "../../entities/servicio";
import { Usuario } from "../../entities/usuario";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";
import { ComentarioInput } from "./comentario.input";

@ObjectType()
@Resolver()

export class ComentarioResolver { 

    @Query(() => [Comentario])
    async Comentarios() {
        return Comentario.find();
    }

    @Authorized([RolesTypes.CLIENTE, RolesTypes.OFERENTE])
    @Query(() => Comentario)
    async createComentario(
        @Arg("data", () => ComentarioInput) data: ComentarioInput
    ) {
        const newData = Comentario.create(data);
        return await newData.save();
    }
    @Mutation(() => Comentario)
    async updateComentario(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ComentarioInput) data: ComentarioInput
    ) {
        await Comentario.update({ id }, data);
        const dataUpdated = await Comentario.findOne(id);
        return dataUpdated;
    }
 
    @Mutation(() => Comentario)
    async RegisterComentario(
        @Arg("descripcion") descripcion: string,
        @Arg("usuario") usuario: Usuario,
        @Arg("servicio") servicio: Servicio,
        @Arg("comentarioPadre") comentarioPadre: Comentario,
        @Arg("estado") estado: EstadosTypes
    ) {
        try {
            await Comentario.insert({
                descripcion,
                usuario,
                servicio,
                comentarioPadre,
                estado
            });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    @Query(() => [Comentario])
    FilterComentario(
        @Arg("servicio", () => Servicio) servicio: Usuario,
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

    @Authorized("ADMIN")
    @Mutation(() => Boolean)
    async deleteComentario(
        @Arg("id", () => Int) id: number
    ) {
        await Comentario.delete(id);
        return true;
    }
}