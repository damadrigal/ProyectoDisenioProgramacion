import { Authorized, Query, Mutation, Arg, Int } from "type-graphql";
import { Categoria } from "../../entities/categoria";
import { EstadosTypes } from "../../enum/estados.enum";
import { CategoriaInput } from "./categoria.input";

export class CategoriaResolver {
    @Authorized("ADMIN")
    @Query(() => [Categoria])
    async Categoriaes() {
        return Categoria.find();
    }

    @Authorized("ADMIN")
    @Mutation(() => Categoria)
    async updateCategoria(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => CategoriaInput) data: CategoriaInput
    ) {
        await Categoria.update({ id }, data);
        const dataUpdated = await Categoria.findOne(id);
        return dataUpdated;
    }

    @Authorized("ADMIN")
    @Mutation(() => Categoria)
    async RegisterCategoria(
        @Arg("data") data: CategoriaInput,
    ) {
        try {
            await Categoria.insert(data);
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    @Authorized("ADMIN")
    @Query(() => [Categoria])
    FilterCategoria(
        @Arg("nombre", () => String) nombre: string,
    ) {
        if (nombre) {
            return Categoria.find({ where: { nombre } });

        } else {
            return Categoria.find();
        }
    }

    @Authorized("ADMIN")
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

    @Mutation(() => Boolean)
    async deleteCategoria(
        @Arg("id", () => Int) id: number
    ) {
        await Categoria.delete(id);
        return true;
    }
}