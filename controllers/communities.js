const { Community } = require("../models/index.js");

module.exports.getCommunities = async (req, res) => {
  console.log(req.header);
  try {
    res.json({ success: true, result: await Community.find({}) });
  } catch (err) {
    res.json({ success: false, msg: "something went wrong", err });
  }
};
module.exports.valid = async (req, res) =>
  res.json({ success: true, community: req.community });

module.exports.deleteCommunity = async (req, res) => {
  console.log(req.body);
  try {
    Community.findByIdAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, err });
  }
};

//  @desc Get Update Item
//  @route GET /api/v1/Item/id
//  @access Public

exports.updateCommunity = async (req, res, next) => {
  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!community) {
      res.status(400).json({
        success: true
      });
    }
    res.status(201).json({
      success: true,
      data: community
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};
