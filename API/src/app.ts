import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import { buildSchema } from "type-graphql"

// import { ProductResolver } from "./resolvers/product/product.resolver";
 import { UsuarioResolver } from './resolvers/users/usuario.resolver';
 import { isAuthorizated } from "./middleware/is-authorizated";
import { ValoracionResolver } from './resolvers/valoracion/valoracion.resolver';
export async function startServer() {
    const app = express();
    const server = new ApolloServer({
        schema: await buildSchema({
             resolvers: [UsuarioResolver,ValoracionResolver],
             authChecker: isAuthorizated
        }),
        context: ({ req, res }) => ({ req, res }),

    });
    server.applyMiddleware({ app, path: '/graphql' });
    return app;
}