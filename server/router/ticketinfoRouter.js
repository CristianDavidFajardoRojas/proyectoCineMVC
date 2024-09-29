const router = require('express').Router();
const layout = require('../view/ticketinfoView');
const ticketInfoV1 = require('../version/ticketinfoV1');
const cookieParser = require('cookie-parser');
const { verify } = require('../middleware/verify');

router.use(layout);
router.use("/v1", cookieParser(), verify, ticketInfoV1);

module.exports = router;