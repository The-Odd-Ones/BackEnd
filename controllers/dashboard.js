const {
  Post,
  Community,
  Event,
  User,
  Like,
  Active
} = require("../models/index.js");
const Models = require('../models/index.js')
const ObjectId = require('mongodb').ObjectID

module.exports.getPosts = async (req, res) => {
  try {
    res.json(
      await Community.populate(
        await Post.aggregate()
          .group({
            _id: "$community",
            posts: { $sum: 1 }
          })
          .match({ _id: { $ne: null } }),
        { path: "_id" }
      )
    );
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

module.exports.getEvents = async (req, res) => {
  try {
    res.json(
      await Community.populate(
        await Event.aggregate().group({
          _id: "$community",
          events: { $sum: 1 }
        }),
        { path: "_id" }
      )
    );
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

module.exports.getLikes = async (req, res) => {
  try {
    res.json(
      await Community.populate(
        await Post.aggregate()
          .lookup({
            from: "likes",
            localField: "_id",
            foreignField: "post",
            as: "likes"
          })
          .project({
            likes: { $size: "$likes" },
            community: "$community"
          })
          .group({
            _id: "$community",
            likes: { $sum: "$likes" }
          })
          .match({ _id: { $ne: null } }),
        { path: "_id" }
      )
    );
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

module.exports.usersCount = async (req, res) => {
  try {
    res.json({
      success: true,
      result: await User.aggregate()
        .project({
          _id: {
            $dateFromParts: {
              year: { $year: "$_id" },
              month: { $month: "$_id" },
              day: { $dayOfMonth: "$_id" }
            }
          }
        })
        .group({
          _id: "$_id",
          users: { $sum: 1 }
        })
        .sort({ _id: 1 })
    });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

module.exports.activity = async (req, res) => {
  try {

    res.json({
      success: true,
      result: await Active.aggregate()
        .match({community : ObjectId(req.params.id)})
        .group({
          _id: "$day",
          users: { $sum: 1 }
        })
        .sort({ _id: 1 })
    });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

module.exports.createCommunity = async (req, res) => {
  try {
    const community = await Community.findOne({ name: req.body.name });
    if (community) {
      return res.json("community available");
    } else {
      const result = await Community.create({ name: req.body.name });
      res.json({ success: true, result });
    }
  } catch (err) {
    res.json({ success: true, err: err.message });
  }
};

module.exports.deactivate = async (req, res) => {
  try {
    const result = await Community.findByIdAndUpdate(
      req.params.id,
      {
        $set: { deactivated: true }
      },
      { new: true }
    );
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: true, msg: err.message });
  }
};

module.exports.activate = async (req, res) => {
  try {
    const result = await Community.findByIdAndUpdate(
      req.params.id,
      {
        $set: { deactivated: false }
      },
      { new: true }
    );
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

module.exports.getCommunities = async (req, res) => {
  try {
    res.json({ success: true, result: await Community.find({}) });
  } catch (err) {
    res.json({ success: false, msg: "something went wrong", err });
  }
};

module.exports.getModels = async (req, res) => {
  try{
    let models = Object.keys(Models).map(one => {
      return {name : one}
    })
    await documentsCounter(models)
    res.json({success:true, result:models })
  }catch(err){
    res.json({success : false, msg : err.message})
  }
}

module.exports.getIndexes = async (req, res) => {
  try{
    res.json({
      success: true,
      result :( await Models[req.params.model].collection.indexes()).filter(one => one.name != '_id_')
    })  
  }catch(err){
    res.json({success : false, msg : err.message})
  }
  
};

module.exports.getNotIndexes = async (req, res) => {
  try{
  let checker = {}
  let indexes = await Models[req.params.model].collection.indexes()
  indexes.forEach(one =>  checker[one.name] = true)
    res.json({
      success: true,
      result : Object.keys(Models[req.params.model]['schema']['obj']).filter(one => !checker[one + '_1'])
    })  
  }catch(err){
    
    res.json({success : false, msg : err.message})
  }
  
};

module.exports.getDocuments = async (req, res) => {
  try{
    res.json({
      success: true,
      result : Object.keys(Models[req.params.model]['schema']['obj'])
    })  
  }catch(err){
    res.json({success : false, msg : err.message})
  }
  
};

module.exports.createIndex = async (req, res) => {
  try{
    res.json({
      success: true,
      result : await Models[req.params.model].collection.createIndex({ [req.body.document]: 1 })
    })  
  }catch(err){
    res.json({success : false, msg : err.message})
  }
};



module.exports.dropIndex = async (req, res) => {
  try{
    res.json({
      success: true,
      result : await Models[req.params.model].collection.dropIndex(req.params.index)
    })  
  }catch(err){
    res.json({success : false, msg : err.message})
  }
  
}

// _id: {
//   $dateFromParts: {
//     year: { $year: "$_id" },
//     month: { $month: "$_id" },
//     day: { $dayOfMonth: "$_id" }
//   }
//

function documentsCounter(modelsArr){
async function assignDocumentsNumber(model){
  model.documents = await Models[model.name].count()
}

return Promise.all(modelsArr.map(one => assignDocumentsNumber(one)))
}
