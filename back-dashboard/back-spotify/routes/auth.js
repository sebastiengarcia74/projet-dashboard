const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


router.get("/login/:userId", authController.login );

router.get("/callback", authController.callback );

router.get("/account", authController.account);

router.post("/refresh-token", authController.refreshToken);

// router.post("/user-id", authController.handleUserId)

module.exports = router;
