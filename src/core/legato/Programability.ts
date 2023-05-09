import { GenericClassDecorator } from "../decorators/types/common";
import Database from "./Database";
import {
  TDatabaseRecordResult,
  SqlServerContext,
} from "./types/database.types";
interface IProcedureOptions {
  procedureName: string;
}

interface IParams {
  name: string;
  default?: any;
}

interface IProcedureMetadata {
  name: string;
  params: IParams[];
}

export function StoredProcedure(options: IProcedureOptions): ClassDecorator {
  return (target: any) => {
    const instance = target;
    const Props = Reflect.hasMetadata("params", instance)
      ? Reflect.getMetadata("params", instance)
      : [];
    const DefineObject = {
      name: options.procedureName,
      params: Props,
    };
    Reflect.defineMetadata("SP", DefineObject, target);
  };
}

export function Params(defaultValue?: any) {
  return (target: any, propertyKey: string) => {
    const instance = target.constructor;

    const params: IParams[] = Reflect.hasMetadata("params", instance)
      ? Reflect.getMetadata("params", instance)
      : [];

    params.push({
      name: propertyKey,
      default: defaultValue,
    });

    Reflect.defineMetadata("params", params, instance);
  };
}

export async function ExecuteProcedure<T>(
  db: Database,
  P: new (...args: any[]) => T,
  K: Partial<T>,
  R: TDatabaseRecordResult<SqlServerContext>
) {
  let ProcMetadata: IParams = Reflect.hasMetadata("SP", P)
    ? Reflect.getMetadata("SP", P)
    : undefined;
  if (typeof ProcMetadata !== "undefined") {
    let executeQuery = `EXEC ${ProcMetadata.name} ${Object.keys(K).map((k) => {
      if (typeof K[k] !== "string") {
        return `@${k}=${K[k]}`;
      } else {
        return `@${k}='${K[k]}'`;
      }
    })}`;
    return await db
      .query(executeQuery, R)
      .then((data) => data)
      .catch((error) => error);
  } else {
    return `Procedure is undefined !!`;
  }
}
