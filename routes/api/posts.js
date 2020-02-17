const  {User} = require('../../models/index.js')
const Router = (module.exports = require("express").Router());
const {
  CommunityMiddleware,
  AuthMiddleware,
  uploadMiddleware,
  ActivityMiddleware
} = require("../../helpers/index.js");
const { PostsController, LikesController, CommentsController} = require("../../controllers/index");

Router.post(
  "/",
  AuthMiddleware,
  CommunityMiddleware,
  ActivityMiddleware,
  uploadMiddleware.single("file"),
  PostsController.createPost
);

Router.get("/", AuthMiddleware, CommunityMiddleware, PostsController.getPosts);
Router.get("/:id", AuthMiddleware,CommunityMiddleware, PostsController.getPost);

Router.get('/:id/like' , AuthMiddleware, CommunityMiddleware,ActivityMiddleware,  LikesController.likePost)
Router.get('/:id/remove' , AuthMiddleware,CommunityMiddleware,ActivityMiddleware, PostsController.remove)
Router.get('/:id/comments' , AuthMiddleware, CommentsController.displayAll)
Router.post('/:id/comment' , AuthMiddleware,CommunityMiddleware,ActivityMiddleware, CommentsController.createComment)
Router.post('/:id/share' , AuthMiddleware, CommunityMiddleware,ActivityMiddleware, PostsController.sharePost)

// Router.get('/try' , CommunityMiddleware, async (req,res)=>{
//   res.json(await User.aggregate([
//     {$lookup :  {
//       from: 'posts',
//       localField: '_id',
//       foreignField: 'user',
//       as: 'posts'
//     }},
//     {$match : {"posts.community" : req.community._id}},
//     {$project:
//          {
//            _id: "$_id",
//            posts: { $size: "$posts" },
//           //  count: { $sum: 1 }
//          }}
//   ]))
  
// })