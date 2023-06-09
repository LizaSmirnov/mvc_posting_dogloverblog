const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//get all Comments
router.get('/', (req, res) => {
    Comment.findAll({
        // model: User,
        attributes: [
            'id',
            'comment_body',
            'comment_date',
            'comment_name',
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
router.post('/', withAuth, (req, res) => {
    //check the session
    console.log('post route hit')
    if(req.session){
        Comment.create({
            ...req.body, //spread operator


            // use the id from the session
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })

        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err)
        })
    }
});


module.exports = router;