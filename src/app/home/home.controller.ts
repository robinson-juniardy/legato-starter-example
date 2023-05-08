import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import AppExtensions from "../../middleware/AppExtensions";
import HomeService from "./home.service";

/**
 * file created detail
 * Home Controller
 * created At : Sat May 06 2023 23:14:48 GMT+0800 (Central Indonesia Time)
 */

@Controller({
  basepath: "/home",
})
export default class Home {
  constructor(private homeService: HomeService = new HomeService()) {}
  @Http.Get({
    path: "/",
  })
  HomePage(request: Request, response: Response) {
    response.render("pages/home", {
      title: "Home Page",
    });
  }
}
