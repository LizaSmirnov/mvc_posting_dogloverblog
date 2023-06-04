const router = require('express').Router();
const { User, Post , Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get  all posts and assoc user and comments
router.get('/', async (req,res) => {
  try {
    const dbPosts = await Post.findAll({include :[User, Comment]})
    .then(dbPosts => {
      res.json(dbPosts);
    })
  } catch (err){
    res.status(404).json(err)
  }
})
//get one post by id
router.get('/:id', async (req, res) => {
  try {
  const dbPosts = await
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
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json({message:'Post has been created!'});
    } catch (err) {
        res.status(404).json(err)
    }
});

// update post
router.put('/:id', async (req, res) => {  
  try{
    // update product data
    const updatedPost = Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
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
      } catch (err) {
    res.status(500).json(err);
  }
});


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