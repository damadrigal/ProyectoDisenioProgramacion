import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context } from "../interfaces/context.interface"; 
import  enviroment   from "../config/enviroments.config";

export const isAuthenticated: MiddlewareFn<any> = async({context}, next) => {

  const authorization = context.req.headers["authorization"];

  const bearer = "Bearer ";
  if (!authorization) {
    throw new Error("No Autenticado");
  }
  if (authorization.indexOf(bearer,0) < 0) {
    throw new Error("No Autenticado");
  }
  try { 
    const token = authorization.replace(bearer,""); 

    const payload = verify(token, enviroment.jwtSecretKey ?? ''); 
    context.usuario = (payload as Context).usuario;
  } catch (err) {

    throw new Error("No Autenticado");
  }
  return await next();
};