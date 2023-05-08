import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import AppExtensions from "../../middleware/AppExtensions";
import AuthService from "./auth.service";

/**
 * file created detail
 * Auth Controller
 * created At : Sat May 06 2023 22:23:58 GMT+0800 (Central Indonesia Time)
 */

@Controller({
  basepath: "/auth",
})
export default class Auth {
  constructor(private authService: AuthService = new AuthService()) {}
  /**
   * Google Authenticator
   */
  @Http.Get({
    path: "/google",
    extensions: [
      AppExtensions.PassportJS.authenticate("google", { scope: ["profile"] }),
    ],
  })
  authentication() {}

  /**
   * Google Authenticator callback
   */
  @Http.Get({
    path: "/google/callback",
    extensions: [
      AppExtensions.PassportJS.authenticate("google", {
        failureRedirect: "/auth/googe/failed",
      }),
    ],
  })
  callback(request: Request, response: Response) {
    response.redirect("/auth/google/success");
  }

  /**
   * Google Authenticator Failed Page Redirect
   */
  @Http.Get({
    path: "/google/failed",
  })
  failed(request: Request, response: Response) {
    response.render("pages/auth/google/failed", {
      flashMessage:
        "You has been failed for authenticated, check your google credentials !!",
    });
  }

  /**
   * Google Authenticator Success Page Redirect
   */
  @Http.Get({
    path: "/google/success",
  })
  success(request: Request, response: Response) {
    let userProfile = request.session["passport"]["user"]["profile"];
    console.log(userProfile);
    response.render("pages/auth/google/success", {
      flashMessage:
        "You has been success for authenticated, thank you for using google authenticator !!",
      profile: {
        userId: userProfile._json.sub,
        fullName: userProfile._json.name,
        firstName: userProfile._json.given_ame,
        lastName: userProfile._json.family_name,
        picture: userProfile._json.picture,
        photos: userProfile.photos,
      },
    });
  }
}
