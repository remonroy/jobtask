const catchAsyncError = require("../middleware/catchAsyncError");
const Task = require("../models/taskModel");

const ErrorHandler = require("../utils/errorHandler");

exports.newTaskCreate = catchAsyncError(async (req, res, next) => {
  console.log("body", req.body);

  let { title, description, level, team, date } = req.body;

  const task = await Task.create({ title, description, level, team, date });
  res.status(200).json({
    success: true,
    task,
  });
});
// getTask
exports.getTask = catchAsyncError(async (req, res, next) => {
  const task = await Task.find();
  if (!task) {
    return next(new ErrorHandler("Not create task.", 400));
  }
  res.status(200).json({ success: true, task });
});

//single task update
exports.singleTaskUpdate = catchAsyncError(async (req, res, next) => {
  if (req.body.option) {
    console.log(req.body);
    const task = await Task.findByIdAndUpdate(
      req.body.id,
      { option: req.body.option },
      { new: true }
    );
    res.status(200).json({ success: true, task });
  }
});
