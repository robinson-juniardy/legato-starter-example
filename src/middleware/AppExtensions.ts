import multer from "multer";
import path from "path";
import passport from "passport";

export default abstract class AppExtensions {
  public static Multer = multer({
    dest: path.join(__dirname, "../public/uploads"),
  });

  public static PassportJS = passport;
}
