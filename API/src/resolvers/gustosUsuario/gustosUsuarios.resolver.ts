import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Int,
    Authorized
} from "type-graphql";
import { Categoria } from "../../entities/categoria";
import { GustosUsuarios } from "../../entities/gustosUsuarios";
import { InformacionPersonal } from "../../entities/informacionpersonal";
import { Usuario } from "../../entities/usuario";
import { EstadosTypes } from "../../enum/estados.enum";
import { RolesTypes } from "../../enum/roles.enum";
import { CategoriaInput } from "../categoria/categoria.input";
import { UsuarioInput } from "../users/usuario.input";
import { GustosUsuariosInput } from "./gustosUsuarios.input";

@ObjectType()
@Resolver()

export class GustosUsuarioResolver {

   // @Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [GustosUsuarios])
    async TodosGustosUsuario() {
        return GustosUsuarios.find();
    }

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [GustosUsuarios])
    FiltrarGustosCategoria(
        @Arg("idCategoria", () => String) idCategoria: Categoria,
    ) {
        if (idCategoria) {
            return GustosUsuarios.find({ where: { categoria: idCategoria } });

        } else {
            return GustosUsuarios.find();
        }
    }

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [GustosUsuarios])
    FiltrarGustosUsuario(
        @Arg("usuario", () => Int) usuario: UsuarioInput,
    ) {
        if (usuario) {
            return GustosUsuarios.find({ where: { usuario } });

        } else {
            return GustosUsuarios.find();
        }
    }

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Query(() => [GustosUsuarios])
    FiltrarGustolD(
        @Arg("ID", () => Int) id: string,
    ) {
        if (id) {
            return GustosUsuarios.find({ where: { id } });

        } else {
            return GustosUsuarios.find();
        }
    }

    //@Authorized([RolesTypes.ADMIN,RolesTypes.OFERENTE,RolesTypes.CLIENTE])
    @Mutation(() => GustosUsuarios)
    async RegistrarGustosPersonal(
        @Arg("data", () => GustosUsuariosInput) data: GustosUsuariosInput
    ) {
        try {
            const newData = GustosUsuarios.create(data);
            return await newData.save();
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    //@Authorized(RolesTypes.ADMIN)
    @Mutation(() => Boolean)
    async AsignarGusto(
        @Arg("idUsuario", () => String) idUsuario: Usuario,
        @Arg("idCategoria", () => String) idCategoria: Categoria,
    ) {
        try {
            
            await GustosUsuarios.insert({
              categoria: idCategoria,
              usuario: idUsuario,
              descripcion: "Se guarda",
              estado: EstadosTypes.ACTIVO,
            });
          } catch (err) {
            return false;
          }
          return true;
    }
    
    //@Authorized(RolesTypes.OFERENTE)
    @Mutation(() => Boolean)
    async EliminarGusto(
        @Arg("id", () => Int) id: number
    ) {
        await GustosUsuarios.delete(id);
        return true;
    }

   // @Authorized(RolesTypes.ADMIN)
    @Mutation(() => GustosUsuarios)
    async InactivarGusto(
        @Arg("id", () => Int) id: number,
        @Arg("estado", () => EstadosTypes) estado: EstadosTypes
    ) {
        await GustosUsuarios.update({ id }, {estado});
        const dataUpdated = await GustosUsuarios.findOne(id);
        return dataUpdated;
    }
}