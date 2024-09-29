const router = require('express').Router();
const layout = require('../view/bookingpageView');
const bookingpageV1 = require('../version/bookingpageV1');
const cookieParser = require('cookie-parser');
const { verify } = require('../middleware/verify');

router.use(layout);
router.use("/v1", cookieParser(), verify, bookingpageV1);

module.exports = router;