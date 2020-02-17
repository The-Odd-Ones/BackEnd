const Router = (module.exports = require("express").Router());
const {
  DashboardController,
  CommunititesController
} = require("../../controllers/index.js");
const {
  AuthMiddleware,
  CommunityMiddleware,
  AdminMiddlware
} = require("../../helpers/index.js");

Router.route('/posts').get(AuthMiddleware, AdminMiddlware, DashboardController.getPosts)
Router.route('/likes').get(AuthMiddleware, AdminMiddlware, DashboardController.getLikes)
Router.route('/events').get(AuthMiddleware, AdminMiddlware, DashboardController.getEvents)
Router.route('/users').get(AuthMiddleware,AdminMiddlware,DashboardController.usersCount)
Router.route('/communities/:id/activity').get(AuthMiddleware,AdminMiddlware,DashboardController.activity)
Router.route('/models').get(AuthMiddleware,AdminMiddlware,DashboardController.getModels)
Router.route('/models/:model/documents').get(AuthMiddleware,AdminMiddlware,DashboardController.getDocuments)
Router.route('/models/:model/indexes').get(AuthMiddleware,AdminMiddlware,DashboardController.getIndexes)
Router.route('/models/:model/notindexes').get(AuthMiddleware,AdminMiddlware,DashboardController.getNotIndexes)
Router.route('/models/:model/indexes').post(AuthMiddleware,AdminMiddlware,DashboardController.createIndex)
Router.route('/models/:model/indexes/:index').delete(AuthMiddleware,AdminMiddlware,DashboardController.dropIndex)



Router.route("/createCommunity").post(
  AuthMiddleware,
  AdminMiddlware,
  DashboardController.createCommunity
);

Router.route("/communities").get(
  AuthMiddleware,
  AdminMiddlware,
  DashboardController.getCommunities
);

Router.route("/communities/:id/deactivate").get(
  AuthMiddleware,
  AdminMiddlware,
  DashboardController.deactivate
);

Router.route("/communities/:id/activate").get(
  AuthMiddleware,
  AdminMiddlware,
  DashboardController.activate
);
