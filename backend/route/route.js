const express = require('express');
const router = express.Router();

const {sendAccessKey,mail,signup,login} = require('../controller/mail.js');

router.post('/sendaccesskey',sendAccessKey);
router.post('/sendmail',mail);

module.exports = router;  