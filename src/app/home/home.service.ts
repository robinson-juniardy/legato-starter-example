
import { Postgres, SqlServer, MySQL } from "../../config/database";
import {
  PostgreeContext,
  SqlServerContext,
  TDatabaseRecordResult,
} from "../../core/legato/types/database.types";

/** 
 * file created detail
 * Home Service
 * created At : Sat May 06 2023 23:14:48 GMT+0800 (Central Indonesia Time)
*/

export default class HomeService {
  constructor(
    private postgres = Postgres,
    private mssql = SqlServer,
    private mysql = MySQL
  ) {}
  Print() {
    return "this is Home service";
  }
}

