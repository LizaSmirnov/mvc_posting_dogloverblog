const router = require('express').Router();
const htmlRoutes = require('./htmlRoutes/homeRoutes');
const apiRoutes = require('./apiRoutes');
// Redirect root URL to "/home"

router.use('/api', apiRoutes)
router.use("/",htmlRoutes);

module.exports = router;