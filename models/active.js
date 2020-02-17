var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;


module.exports = mongoose.model("active", mongoose.Schema({
    user: {
      ref: "user",
      type: ObjectId
    },
    community: {
        ref: "community",
        type: ObjectId
      },
    day: Date
    
  }));
