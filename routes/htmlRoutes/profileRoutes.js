const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');


router.get('/', async (req, res) => {
   Post.findAll({
        where: {
            user_id: req.session.user_id
        },
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],include: [
        {
            model: Comment,
            attributes: ['comment_text'],
            },      
    ],
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain:true}));
        res.render('profile', {posts, loggedIn:req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
        })
    });

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],include: [
                {
                    model: Comment,
                    attributes: ['comment_text'],
                },      
            ],
        });
        const post = postData.get({plain:true});
        res.render('post', {post, loggedIn:req.session.loggedIn});
    } catch (err) {
        res.status(404).json(err);
    }
}
);

router.get('/create/:id', async (req, res) => {
    Post.findAll({
        where:{
            id:req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],include: [
            {         
                model: Comment,
                attributes: ['comment_text'],
            },
        ],
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain:true}));
        res.render('create', {posts, loggedIn:req.session.loggedIn});
    }   
    )
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
        }
    );
});

router.get('/new', (req, res) => {
    res.render('new', {loggedIn:req.session.loggedIn})
});

module.exports = router;
