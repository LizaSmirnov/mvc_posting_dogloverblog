const router = require('express').Router();

router.get('/', (req, res) => {
    console.log("get comment route hit")
    res.json({message: "get comment route hit"})
});

module.exports = router;