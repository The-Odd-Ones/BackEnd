const Router = (module.exports = require("express").Router());
const { CommunititesController } = require("../../controllers/index.js");
const {
  AuthMiddleware,
  CommunityMiddleware
} = require("../../helpers/index.js");

Router.route("/").get(AuthMiddleware, CommunititesController.getCommunities);
Router.route("/check").get(
  AuthMiddleware,
  CommunityMiddleware,
  CommunititesController.valid
);

