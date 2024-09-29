const router = require('express').Router();
const layout = require('../view/loginView');
const loginV1 = require('../version/loginV1');

router.use(layout);
router.use("/v1", loginV1);

module.exports = router;