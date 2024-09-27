const router = require('express').Router();
const layout = require('../view/moviedetailView');
const moviedetailV1 = require('../version/moviedetailV1');
const cookieParser = require('cookie-parser');
const { verify } = require('../middleware/verify');

router.use("/v1", cookieParser(), verify, moviedetailV1);
router.use(layout);

module.exports = router;