import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { Servicio } from "../../entities/servicio";
import { Usuario } from "../../entities/usuario";
import { ValoracionServicio } from "../../entities/valoracionservicio";
import { RolesTypes } from "../../enum/roles.enum";
import { ValoracionInput } from "./valoracion.input";



@Resolver()
export class ValoracionResolver {

    @Query(() => [ValoracionServicio])
    async Valoraciones() {
        return ValoracionServicio.find();
    }

    @Query(() => [ValoracionServicio])
    async ValoracionPorServicioUsuario(
         @Arg("idUsuario", () => Int) idUsuario: Usuario,
         @Arg("idServicio", () => Int) idServicio: Servicio) 
    {
        return ValoracionServicio.find({ where: { usuario: idUsuario, servicio: idServicio} });
    }

    //@Authorized([RolesTypes.ADMIN])
    @Mutation(() => Boolean)
    async CrearValoracion(
        @Arg("idUsuario", () => Int) idUsuario: Usuario,
        @Arg("idServicio", () => Int) idServicio: Servicio,
        @Arg("valor", () => Int) valor: Number
    ) {
        try {
            await ValoracionServicio.insert({
              usuario: idUsuario,
              servicio: idServicio,
              valoracion: valor 
            });
          } catch (err) {
            return false;
          }
        return true;
    }

    @Authorized([RolesTypes.CLIENTE])
    @Mutation(() => ValoracionServicio)
    public async ModificarValoracion(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => ValoracionInput) data: ValoracionInput
    ) {
        await ValoracionServicio.update({ id }, data);
        const dataUpdated = await ValoracionServicio.findOne(id);
        return dataUpdated;
    }

}