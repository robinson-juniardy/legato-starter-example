
import { Postgres, SqlServer, MySQL } from "../../config/database";
import {
  PostgreeContext,
  SqlServerContext,
  TDatabaseRecordResult,
} from "../../core/legato/types/database.types";

/** 
 * file created detail
 * Auth Service
 * created At : Sat May 06 2023 22:23:58 GMT+0800 (Central Indonesia Time)
*/

export default class AuthService {
  constructor(
    private postgres = Postgres,
    private mssql = SqlServer,
    private mysql = MySQL
  ) {}
  Print() {
    return "this is Auth service";
  }
}

