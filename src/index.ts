import "reflect-metadata";
import Application, { dependency } from "./core/legato/Application";
import { Routes } from "./core/routers/routers";
import cors from "cors";
import express from "express";
import path from "path";

new Application(
  8888,
  Routes.autoload(),
  [
    dependency.use(cors()),
    dependency.use(express.json()),
    dependency.use(express.urlencoded({ extended: true })),
    dependency.use("/static", express.static(path.join(__dirname, "public"))),
  ],
  {
    renderOptions: {
      viewEngine: "ejs",
      viewPath: path.join(__dirname, "views"),
    },
  }
);
