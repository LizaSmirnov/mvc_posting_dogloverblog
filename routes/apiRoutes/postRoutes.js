const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        
    }

router.get('/', (req, res) => {
    console.log("get posts route hit")
    res.json({message: "get posts route hit"})
});

module.exports = router;