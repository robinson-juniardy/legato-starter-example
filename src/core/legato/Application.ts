import express from "express";

export const dependency = express();
export default class Application {
  public legato = express();
  protected app: any;
  protected routers: any;
  constructor(
    private port: string | number,
    private routes: any,
    private dependencies: any[],
    private set?: {
      renderOptions?: {
        viewEngine: string;
        viewPath: string;
      };
    }
  ) {
    this.legato.use(dependencies);
    if (set.renderOptions) {
      this.legato.set("view engine", set.renderOptions.viewEngine);
      this.legato.set("views", set.renderOptions.viewPath);
    }
    this.listen(port);
    this.legato.use(routes);
  }

  listen(port: string | number) {
    this.legato.listen(port, () => {
      console.log(`App Started On Port ${port}`);
    });
  }
}
