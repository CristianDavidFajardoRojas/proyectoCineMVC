const router = require('express').Router();
const layout = require('../view/signupView');
const signupV1 = require('../version/signupV1');

router.use(layout);
router.use("/v1", signupV1);

module.exports = router;