import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Int,
  Authorized,
} from "type-graphql";
import { InfoPersonalInput } from "./infoPersonal.input";
import { InfoPersonalUpdateInput } from "./infoPersonalUpdate.input";

import { InformacionPersonal } from "../../entities/informacionpersonal";
import { RolesTypes } from "../../enum/roles.enum";
import { UsuarioInput } from "../users/usuario.input";
import { UsuarioResolver } from "../users/usuario.resolver";
import { Usuario } from "../../entities/usuario";

@ObjectType()
@Resolver()
export class InformacionPersonalResolver {
  //TODO: analisar el acceso a esta informacion por parte de los roles
  @Authorized([RolesTypes.ADMIN, RolesTypes.OFERENTE, RolesTypes.CLIENTE])
  @Query(() => [InformacionPersonal])
  async InfoPersonal() {
    return await InformacionPersonal.find();
  }

  @Authorized([RolesTypes.ADMIN, RolesTypes.OFERENTE, RolesTypes.CLIENTE])
  @Query(() => [InformacionPersonal])
  async FiltrarInfoPersonal(@Arg("nombre", () => String) nombre: string) {
    if (nombre) {
      return await InformacionPersonal.find({ where: { nombre } });
    } else {
      return await InformacionPersonal.find();
    }
  }

  //@Authorized([RolesTypes.ADMIN, RolesTypes.OFERENTE, RolesTypes.CLIENTE])
  @Query(() => [InformacionPersonal])
  async FiltrarInfoPersonalUsuario(
    @Arg("usuario", () => Int) usuario: UsuarioInput
  ) {
    if (usuario) {
      return await InformacionPersonal.find({ where: { usuario } });
    } else {
      return await InformacionPersonal.find();
    }
  }

  //@Authorized([RolesTypes.ADMIN, RolesTypes.OFERENTE, RolesTypes.CLIENTE])
  @Query(() => [InformacionPersonal])
  async FiltrarInfoPersonalID(@Arg("id", () => Int) id: string) {
    if (id) {
      return await InformacionPersonal.find({ where: { id } });
    } else {
      return await InformacionPersonal.find();
    }
  }

 // @Authorized([RolesTypes.ADMIN, RolesTypes.OFERENTE, RolesTypes.CLIENTE])
  @Mutation(() => InformacionPersonal)
  async ModificarInfoPersonal(
    @Arg("id", () => Int) id: number,
    @Arg("data", () => InfoPersonalUpdateInput) data: InfoPersonalUpdateInput
  ) {
    await InformacionPersonal.update({ id }, data);
    const dataUpdated = await InformacionPersonal.findOne(id);
    return dataUpdated;
  }

  //@Authorized([RolesTypes.ADMIN, RolesTypes.OFERENTE, RolesTypes.CLIENTE])
  @Mutation(() => InformacionPersonal)
  async RegistrarInfoPersonal(
    @Arg("idUsuario", () => Int!) idUsuario: Usuario,
    @Arg("data", () => InfoPersonalInput) data: InfoPersonalInput
  ) {
    try {
      const newData = InformacionPersonal.create(data);
      await newData.save();
      await InformacionPersonal.update({ id: newData.id }, {usuario:idUsuario});
      const dataUpdated = await InformacionPersonal.findOne(newData.id);
      return dataUpdated;

    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  @Authorized(RolesTypes.OFERENTE)
  async EliminarInfoPersonal(@Arg("id", () => Int) id: number) {
    await InformacionPersonal.delete(id);
    return true;
  }
}
