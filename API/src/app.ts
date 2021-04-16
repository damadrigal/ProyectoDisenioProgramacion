import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import { buildSchema } from "type-graphql"

// import { ProductResolver } from "./resolvers/product/product.resolver";
 import { UsuarioResolver } from './resolvers/users/usuario.resolver';
 import { isAuthorizated } from "./middleware/is-authorizated";
export async function startServer() {
    const app = express();
    const server = new ApolloServer({
        schema: await buildSchema({
             resolvers: [UsuarioResolver],
             authChecker: isAuthorizated
        }),
        context: ({ req, res }) => ({ req, res }),

    });
    server.applyMiddleware({ app, path: '/graphql' });
    return app;
}