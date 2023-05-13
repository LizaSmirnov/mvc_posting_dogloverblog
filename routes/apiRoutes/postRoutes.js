const router = require('express').Router();

router.get('/', (req, res) => {
    console.log("get posts route hit")
    res.json({message: "get posts route hit"})
});

module.exports = router;