const { newTeamCreate, getTeam } = require("../controllers/teamController");

const router = require("express").Router();

router.route("/newTeam").post(newTeamCreate);
router.route("/getTeam").get(getTeam);

module.exports = router;
