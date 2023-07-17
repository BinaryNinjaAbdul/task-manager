const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { isLoggedIn } = require("../middleware/checkAuth");

const router = express.Router();

/***
 * Dashboard Controller
 * GET /dashboard
 */

router.get("/dashboard", isLoggedIn, dashboardController.dashboard);
router.get("/dashboard/item/:id", isLoggedIn, dashboardController.dashboardViewNode);
router.put("/dashboard/item/:id", isLoggedIn, dashboardController.dashboardUpdateNode);
router.delete("/dashboard/item-delete/:id", isLoggedIn, dashboardController.dashboardDeleteNode);

router.get("/dashboard/add", isLoggedIn, dashboardController.dashboardAddTask);
router.post("/dashboard/add", isLoggedIn, dashboardController.dashboardAddTaskSumit);
// router.get("/dashboard/search", isLoggedIn, dashboardController.dashboardSearch);
router.post("/dashboard/search", isLoggedIn, dashboardController.dashboardSearchSubmit);

module.exports = router;
