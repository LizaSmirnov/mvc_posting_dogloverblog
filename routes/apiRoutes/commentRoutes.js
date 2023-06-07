const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//get all Comments
router.get('/', async (req, res) => {
    try{
        const dbCommentData = await Comment.findAll({include:[User]})
        .then(dbCommentData => {
            res.json(dbCommentData);
        }
        )
    } catch (err){
        res.status(404).json(err)
    }
});


//get one Comment by id
router.get('/:id', (req, res) => {
    Comment.findOne({
        where:{
            id:req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(404).json({message: 'No Comment found with this id bro...'});        
            return; //lets users try again also so not left hanging
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

//create a new Comment
router.post('/', withAuth, async (req, res) => {
    if(!req.session.loggedIn){
        res.redirect('/login'); //if not logged in, redirect to login page
    }
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