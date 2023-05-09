import { Params, StoredProcedure } from "../core/legato/Programability";

@StoredProcedure({
  procedureName: "your_procedure_name",
})
export class MyProcedure {
  @Params()
  public my_params: string;
}
