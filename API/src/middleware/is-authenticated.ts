import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context } from "../interfaces/context.interface"; 
import  enviroment   from "../config/enviroments.config";

export const isAuthenticated: MiddlewareFn<Context> = async ({context}, next) => {
  console.log(context);
  const authorization = context.req.headers["authorization"];
  console.log("authorization");

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
    console.log(context.usuario);
  } catch (err) {

    throw new Error("No Autenticado");
  }
  return next();
};