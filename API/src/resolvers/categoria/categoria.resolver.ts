import { Arg, Authorized, Int, Mutation, ObjectType, Ctx,UseMiddleware, Query, Resolver } from "type-graphql";
import { Categoria } from "../../entities/categoria";
import { Servicio } from "../../entities/servicio";
import { Usuario } from "../../entities/usuario";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";
import { ServicioInput } from "../servicio/servicio.input";
import { UsuarioResolver } from "../users/usuario.resolver";
import { UsuarioInput } from "../users/usuario.input";
import { CategoriaInput } from "./categoria.input";
import { isAuthenticated } from "../../middleware/is-authenticated";

@ObjectType()
@Resolver()

export class CategoriaResolver { 
    @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [Categoria])
    async Categorias() {
        return Categoria.find();
    }


    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Categoria)
    async createCategoria(
        @Arg("data", () => CategoriaInput) data: CategoriaInput
    ) {
        const newData = Categoria.create(data);
        return await newData.save();
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Categoria)
    async updateCategoria(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => CategoriaInput) data: CategoriaInput
    ) {
        await Categoria.update({ id }, data);
        const dataUpdated = await Categoria.findOne(id);
        return dataUpdated;
    }

    @Query(() => [Categoria])
    FilterCategoria(
        @Arg("servicio", () => ServicioInput) servicio: ServicioInput,
    ) {
        if (servicio) {
            return Categoria.find({ where: { servicio } });

        } else {
            return Categoria.find();
        }
    }

    @Query(() => [Categoria])
    FilterCategoriaCodigo(
        @Arg("codigo", () => String) codigo: String,
    ) {
        if (codigo) {
            return Categoria.find({ where: { codigo } });

        } else {
            return Categoria.find();
        }
    }

    
    @Query(() => [Categoria])
    FilterCategoriaID(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return Categoria.find({ where: { id } });

        } else {
            return Categoria.find();
        }
    }
    
    @Authorized(RolesTypes.ADMIN)
    @UseMiddleware(isAuthenticated)
    @Mutation(() => Boolean)
    async deleteCategoria(
        @Arg("id", () => Int) id: number
    ) {
        await Categoria.delete(id);
        return true;
    }
}