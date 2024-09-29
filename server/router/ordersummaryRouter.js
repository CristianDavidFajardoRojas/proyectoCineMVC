const router = require('express').Router();
const layout = require('../view/ordersummaryView');
const ordersummaryV1 = require('../version/ordersummaryV1');
const cookieParser = require('cookie-parser');
const { verify } = require('../middleware/verify');

router.use(layout);
router.use("/v1", cookieParser(), verify, ordersummaryV1);

module.exports = router;