const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userPhotoUpdate,
  userDetails,
  singleUserFind,
} = require("../controllers/userController");
const upload = require("../utils/multer");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/me").get(userDetails);
router.route("/me/photo").put(userPhotoUpdate);
router.route("/singleUser").post(singleUserFind);

module.exports = router;
