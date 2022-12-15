import { TMethods } from "../types/common";
export interface IRouter {
  path: string;
  method: TMethods;
  handlerName: PropertyKey;
  middlewares: Function[];
  extensions?: any[];
}

export interface IRegisterOptions {
  path: string;
}
