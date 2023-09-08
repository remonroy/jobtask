const {
  newTaskCreate,
  getTask,
  singleTaskUpdate,
} = require("../controllers/taskController");

const router = require("express").Router();

router.route("/createTask").post(newTaskCreate);
router.route("/getTask").get(getTask);
router.route("/updateOption").put(singleTaskUpdate);

module.exports = router;
