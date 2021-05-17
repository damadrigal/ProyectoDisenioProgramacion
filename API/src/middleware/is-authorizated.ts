
import { AuthChecker } from "type-graphql"
import { Context } from "../interfaces/context.interface";
import { verify } from "jsonwebtoken";
import enviroment from "../config/enviroments.config";

export const isAuthorizated: AuthChecker<Context> = ({context}, roles) => {
    const authorization = context.req.headers["authorization"];
    const bearer ="Bearer ";
    if (!authorization) {
        throw new Error("Not authorizated");
    }

    if (authorization.indexOf(bearer, 0) < 0) {
        throw new Error("Not authorizated");
    }
    try {
        const token = authorization.replace(bearer, "");

        const payload = verify(token, enviroment.jwtSecretKey ?? '');

        context.usuario = (payload as Context).usuario;
    } catch (err) {

        throw new Error("Not authorizated");
    }

    const usuario = context.usuario;
    if (!usuario) {
        return false;
    }
    
    if (roles.length === 0) {
        return usuario !== undefined;
    }

    if (roles.includes(usuario.role)) {
        return true;
    }
    return false;
};