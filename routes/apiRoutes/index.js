const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes)
router.use("/comments",commentRoutes);
router.use("/posts",postRoutes);


module.exports = router;