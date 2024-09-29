const router = require('express').Router();
const layout = require('../view/mainPage');
const mainPageV1 = require('../version/mainpageV1');
const cookieParser = require('cookie-parser');
const { verify } = require('../middleware/verify');

router.use(layout);
router.use("/v1", cookieParser(), verify, mainPageV1);

module.exports = router;