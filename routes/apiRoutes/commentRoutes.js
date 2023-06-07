const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');


//get all Comments
router.get('/', (req, res) => {
    Comment.findAll({
        // model: User,
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'post_id',
            'created_at'
        ],
        order: [['created_at', 'DESC']]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
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



module.exports = router;