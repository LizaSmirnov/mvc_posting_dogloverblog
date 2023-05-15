const router = require('express').Router();
const { User, Post , Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get  all posts
router.get('/', (req,res) => {
  try {
    Post.findAll({include :[User, Comment]})
    .then(dbPosts => {
      res.json(dbPosts);
    })
  } catch (err){
    res.status(404).json(err)
  }
})
//get one post by id
router.get('/:id', (req, res) => {
  try {
  Post.findByPk(req.params.id,{include:[User, Comment]})
  .then(dbPosts =>{
    res.json(dbPosts)
  })
} catch (err){
  res.status(404).json(err)
}
});

//create a new post
router.post('/', withAuth, async (req, res) => {
  if(!req.session.user){ //have to be logged in to post comment
    return res.status(401).json({msg:"Please login!"})
  }

    try {
        const newPost = await Post.create({
            ...req.body,
            title: req.session.title,
            user_id: req.session.user_id,
            
        });
        res.status(200).json(newPost);
        res.json({message:'Post has been created!'})
    } catch (err) {
        res.status(404).json(err)
    }
});

// update post
router.put('/:id', (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
    return;
  }
    // update product data
    Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((updatedPost) => {
        // find all associated tags from ProductTag
        res.json(updatedPost);
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      });
  }),
//delete post with authenticated id and verified post id
router.delete('/:id', withAuth, async (req,res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
    return;
  }
    try {
        const postData = await Post.destroy({
            where:{
                id:req.params.id,
                user_id:req.session.user_id
            },
        });
        if(!postData){
            res.status(404).json({message: 'No post found with this id bro...'});
            return; //lets users try again also so not left hanging
        }
        res.status(200).json(postData);
    } catch (err){
        res.status(404).json(err)
    }
});


module.exports = router;