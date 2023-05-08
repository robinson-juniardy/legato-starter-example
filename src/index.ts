import "reflect-metadata";
import "dotenv/config";
import Application, { dependency } from "./core/legato/Application";
import { Routes } from "./core/routers/routers";
import cors from "cors";
import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import session from "express-session";
import { COOKIE_KEY } from "./config/constants";
import "./config/passport-setup";
import passport from "passport";

new Application(
  8888,
  Routes.autoload(),
  [
    dependency.use(cors()),
    dependency.use(express.json()),
    dependency.use(express.urlencoded({ extended: true })),
    dependency.use("/static", express.static(path.join(__dirname, "public"))),
    dependency.use(
      session({
        secret: COOKIE_KEY,
        resave: true,
        saveUninitialized: true,
      })
    ),
    dependency.use(passport.initialize()),
    dependency.use(passport.session()),
  ],
  {
    renderOptions: {
      viewEngine: "handlebars",
      viewPath: path.join(__dirname, "views"),
      viewModule: {
        engine: engine(),
        engineName: "handlebars",
      },
    },
  }
);
