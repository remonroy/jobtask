const catchAsyncError = require("../middleware/catchAsyncError");
const Team = require("../models/teamModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

exports.newTeamCreate = catchAsyncError(async (req, res, next) => {
  let { title, description, color } = req.body;
  const team = await Team.create({ title, description, color });
  res.status(200).json({
    success: true,
    team,
  });
});
//get Team
exports.getTeam = catchAsyncError(async (req, res, next) => {
  const team = await Team.find();
  if (!team) {
    return next(new ErrorHandler("Not create team.", 400));
  }
  res.status(200).json({ success: true, team });
});
