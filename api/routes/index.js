const express = require('express');
var router = express.Router();
var home_controller = require('../controller/home_controller.js');
var otp_controller = require('../controller/otp_controller.js');
var email_controller = require('../controller/email_controller.js');
var file_upload_controller = require('../controller/file_upload_controller.js');
var video_controller = require('../controller/video_controller.js');
var user_display = require('../controller/user_display.js');

//Home Route:
router.route('/').get(home_controller.HomePath);

//OTP Verfification Routes:
router.route('/register').post(otp_controller.userDetails);
router.route('/verify').post(otp_controller.verifyResult);

//Email Sending Routes:
router.route('/send-email').post(email_controller.sendMail);

//File Uploading Routes:
router.route('/api/photo').post(file_upload_controller.fileUpload);

//Video Playing Routes:
router.route('/videos').get(video_controller.VideoPlay);

//User Display Routes:
router.route('/result').post(user_display.UserDisplay);

module.exports = router;
