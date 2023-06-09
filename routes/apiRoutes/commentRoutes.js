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
    
    console.log(CommentData, 'this is the comment data')
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
    //check the session
    if(req.session){
        const newComment = await Comment.create({
            ...req.body,
            // use the id from the session
            user_id: req.session.user_id,
            post_id: req.body.post_id,

        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    } return document.location.windows('/home');
});



module.exports = router;