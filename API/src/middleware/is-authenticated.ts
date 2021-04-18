import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context } from "../interfaces/context.interface"; 
import  enviroment   from "../config/enviroments.config";
import { Usuario } from "../entities/usuario"; 

export const isAuthenticated: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.cookies.authorization;
  console.log(authorization);

  const bearer = "bearer ";
  if (!authorization) {
    throw new Error("Not authenticated");
  }
  if (authorization.indexOf(bearer,0) < 0) {
    throw new Error("Not authenticated");
  }
  try { 
    const token = authorization.replace(bearer,""); 
    console.log(token);

    const payload = verify(token, enviroment.jwtSecretKey ?? ''); 
    context.usuario = (payload as Context).usuario;
  } catch (err) {
    throw new Error("Not authenticated");
  }
  return next();
};