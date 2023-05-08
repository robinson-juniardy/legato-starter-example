import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import WelcomeService from "./welcome.service";

@Controller({
  basepath: "/welcome",
  middlewares: ["auth"],
})
export default class Welcome {
  constructor(private welcomeService: WelcomeService = new WelcomeService()) {}
  @Http.Get({
    path: "/",
  })
  PrintMessage(request: Request, response: Response) {
    if (request.session["passport"]) {
      response.render("pages/welcome", {
        title: "Welcome Page",
      });
    } else {
      response.redirect("/home");
    }
  }
}
