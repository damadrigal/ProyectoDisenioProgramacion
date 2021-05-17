import express from "express";
import { ApolloServer } from "apollo-server-express";

import { buildSchema } from "type-graphql";
import { UsuarioResolver } from "./resolvers/users/usuario.resolver";
import { isAuthorizated } from "./middleware/is-authorizated";
import { ValoracionResolver } from "./resolvers/valoracion/valoracion.resolver";
import { RolResolver } from "./resolvers/rol/rol.resolver";
import { ServicioResolver } from "./resolvers/servicio/servicio.resolver";
import { ParametroResolver } from "./resolvers/parametro/parametro.resolver";
import { InformacionPersonalResolver } from "./resolvers/informacionPersonal/informacionpersonal.resolver";
import { ComentarioResolver } from "./resolvers/comentario/comentario.resolver";

import { TipoSalarioResolver } from "./resolvers/tipoSalario/tipoSalario.resolver";
import { CategoriaResolver } from "./resolvers/categoria/categoria.resolver";
import { PuestoResolver } from "./resolvers/puesto/puesto.resolver";
import { GustosUsuarioResolver } from "./resolvers/gustosUsuario/gustosUsuarios.resolver";
import { isAuthenticated } from "./middleware/is-authenticated";

export async function startServer() {
  const app = express();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UsuarioResolver,
        ValoracionResolver,
        RolResolver,
        ServicioResolver,
        ParametroResolver,
        InformacionPersonalResolver,
        ComentarioResolver,
        TipoSalarioResolver,
        ParametroResolver,
        CategoriaResolver,
        PuestoResolver,
        GustosUsuarioResolver,
      ],
      authChecker: isAuthorizated,
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  server.applyMiddleware({ app, path: "/graphql" });
  return app;
}
