import { Arg, Authorized, Int, Mutation, ObjectType, UseMiddleware, Query, Resolver } from "type-graphql";
import { Categoria } from "../../entities/categoria";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";
import { ServicioInput } from "../servicio/servicio.input";
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

    @Query(() => [Categoria])
    FiltrarCategoria(
        @Arg("servicio", () => ServicioInput) servicio: ServicioInput,
    ) {
        if (servicio) {
            return Categoria.find({ where: { servicio } });

        } else {
            return Categoria.find();
        }
    }

    @Query(() => Categoria)
    FiltrarCategoriaCodigo(
        @Arg("codigo", () => String) codigo: String,
    ) {
        if (codigo) {
            return Categoria.findOne({ where: { codigo } });

        } else {
            return Categoria.findOne();
        }
    }
    
    @Query(() => Categoria)
    FiltrarCategoriaID(
        @Arg("ID", () => Int) id: number,
    ) {
        if (id) {
            return Categoria.findOne({ where: { id } });
        } else {
            return Categoria.findOne();
        }
    }

    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Categoria)
    async CrearCategoria(
        @Arg("data", () => CategoriaInput) data: CategoriaInput
    ) { 
        const newData = Categoria.create(data);
        return await newData.save(); 
    }
    @Authorized(RolesTypes.ADMIN)
    @Mutation(() => Categoria)
    async ModificarCategoria(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => CategoriaInput) data: CategoriaInput
    ) {
        await Categoria.update({ id }, data);
        const dataUpdated = await Categoria.findOne(id);
        return dataUpdated;
    }
    
    @Authorized(RolesTypes.ADMIN)
    //@UseMiddleware(isAuthenticated)
    @Mutation(() => Categoria)
    async InactivarCategoria(
        @Arg("id", () => Int) id: number,
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes
    ) {
        await Categoria.update({ id }, {estado});
        const dataUpdated = await Categoria.findOne(id);
        return dataUpdated;
    }
}