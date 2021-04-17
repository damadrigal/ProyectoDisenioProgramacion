import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { Comentario } from "../../entities/comentario";
import { RolesTypes } from "../../enum/roles.enum";
import { ComentarioInput } from "./comentario.input";

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
}