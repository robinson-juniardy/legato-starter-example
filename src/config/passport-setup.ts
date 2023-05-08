import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import * as constant from "../config/constants";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  new Strategy(
    {
      clientID: constant.GOOGLE_CLIENT_ID,
      clientSecret: constant.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8888/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  )
);
