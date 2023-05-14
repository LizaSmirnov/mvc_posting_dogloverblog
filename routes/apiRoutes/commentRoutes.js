const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log("get comment route hit")
    res.json({message: "get comment route hit"})
});

//create a new Comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
        res.json({message:'Comment has been created!'})
    } catch (err) {
        res.status(404).json(err)
    }
});

//delete Comment with authenticated id and verified Comment id
router.delete('/:id', withAuth, async (req,res) => {
    try {
        const commentData = await Comment.destroy({
            where:{
                id:req.params.id,
                user_id:req.session.user_id
            },
        });
        if(!commentData){
            res.status(404).json({message: 'No Comment found with this id bro...'});
            return; //lets users try again also so not left hanging
        }
        res.status(200).json(commentData);
    } catch (err){
        res.status(404).json(err)
    }
});

module.exports = router;