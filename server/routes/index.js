const express = require("express");
const mainController = require('../controllers/mainController')

const router = express.Router();

/***
 * App Routes 
 * GET /
 * GET /about
 */

router.get("/", mainController.homepage);
router.get("/about", mainController.about);

module.exports = router;
