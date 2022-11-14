import { MiddlewareFn } from "type-graphql";
import { ApiError } from "../errors/Error";
import { Context } from "../types/context";



export const EnsureAuthenticated: MiddlewareFn<Context> = ({context}, next) => {

  const token = context.token?.replace('Bearer', '').trim()

  if(!token){
    throw new ApiError('unauthorized', 401)
  }


  return next()
}