const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const Team = require("../models/teamModel");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
//user register
exports.userRegister = catchAsyncError(async (req, res, next) => {
  const { name, email, designation, bio, password, confirmPassword } = req.body;
  if (!name) {
    return next(new ErrorHandler("Please Enter Your Name.", 400));
  } else if (!email) {
    return next(new ErrorHandler("Please Enter Your Email.", 400));
  } else if (!designation) {
    return next(new ErrorHandler("Please Enter Your designation.", 400));
  } else if (!bio) {
    return next(new ErrorHandler("Please Enter Your bio.", 400));
  } else if (!password) {
    return next(new ErrorHandler("Please Enter Your password.", 400));
  } else if (password.length < 8) {
    return next(
      new ErrorHandler("password should be greater than 8 characters.", 400)
    );
  } else if (!confirmPassword) {
    return next(new ErrorHandler("Please Enter Your Confirm Password.", 400));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password Doesn't match.", 400));
  }
  const user = await User.create({
    name,
    email,
    designation,
    bio,
    password,
    avatar: {
      public_id: "This is public id",
      url: "This is public url",
    },
  });

  res.status(201).json({
    success: true,
    user,
  });
});

//user login
exports.userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please Enter Your Loging Email.", 400));
  } else if (!password) {
    return next(new ErrorHandler("Please Enter Your Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email & password", 401));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email & password", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//UserDetails
exports.userDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// User Image change
exports.userPhotoUpdate = catchAsyncError(async (req, res, next) => {
  console.log("Avatar", req.body);
  const UserNewInfo = {
    avatar: {
      public_id: "This is public id",
      url: "This is public url",
    },
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.body.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "ibos",
      width: 150,
      crop: "scale",
    });
    UserNewInfo.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.body.id, UserNewInfo, {
    new: true,
  });
  if (!user) {
    next(new ErrorHandler(`User doesn\'t exist with`, 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//single user find
exports.singleUserFind = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not exits.", 400));
  }
  const notExits = await Team.findById({ _id: req.body.id });

  if (notExits.members.length < 1) {
    const team = await Team.findByIdAndUpdate(
      { _id: req.body.id },
      { members: req.body.email },
      { new: true }
    );
  }

  const existingMember = notExits.members.find(
    (item) => item === req.body.email
  );

  if (existingMember) {
    return next(new ErrorHandler("Members already exits.", 400));
  }

  res.status(200).json({ success: true, user });
});
